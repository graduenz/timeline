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

    response = await client.query(q.Paginate(q.Match(q.Ref("indexes/idx_items_timeline_id"), timelineId)));
    const getAllQuery = response.data.map(r => q.Get(r));
    const entities = await client.query(getAllQuery);

    entities.sort((a, b) => a.data.order - b.data.order);

    return {
      statusCode: 200,
      body: JSON.stringify(entities),
    };
  }
  catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err),
    };
  }
}