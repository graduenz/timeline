const faunadb = require("faunadb");
const q = faunadb.query;

const utils = require('./utils');

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const timelineId = utils.getId(event.path);
    let response = await client.query(q.Get(q.Ref(`classes/timelines/${timelineId}`)));
    
    if (!utils.userOwns(response, user)) {
      throw {
        success: false,
        message: "This timeline does not belong to you",
      };
    }
    
    const now = new Date().toISOString();
    const items = JSON.parse(event.body);

    items.forEach(m => {
      m.data.timeline_id = timelineId;
      m.data.updated_at = now;
    });

    response = await client.query(q.Paginate(q.Match(q.Ref("indexes/idx_items_timeline_id"), timelineId)));
    const missingItemsIds = response.data
      .map(m => m.value.id)
      .filter(id => items.findIndex(m => m.ref["@ref"].id === id) == -1);

    const deleteMissingQuery = missingItemsIds.map(m => {
      return q.Delete(q.Ref(`classes/items/${m}`));
    });

    const updateAllQuery = items.filter(m => !m.isNew).map(m => {
      return q.Update(q.Ref(`classes/items/${m.ref["@ref"].id}`), { data: m.data });
    });
    
    const insertAllQuery = items.filter(m => m.isNew).map(m => {
      m.data.created_at = now;
      return q.Create(q.Ref("classes/items"), { data: m.data })
    });

    await Promise.all([ client.query(deleteMissingQuery), client.query(updateAllQuery), client.query(insertAllQuery) ]);

    return {
      statusCode: 200,
      body: "OK"
    };
  }
  catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err),
    };
  }
}