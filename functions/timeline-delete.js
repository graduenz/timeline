const faunadb = require("faunadb");
const q = faunadb.query;

const utils = require('./utils');

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  if (!user) return { statusCode: 401 };

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const id = utils.getId(event.path);
    let response = await client.query(q.Get(q.Ref(`classes/timelines/${id}`)));

    if (!utils.userOwns(response, user)) {
      throw {
        success: false,
        message: "This timeline does not belong to you",
      };
    }

    response = await client.query(q.Delete(q.Ref(`classes/timelines/${id}`)));

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  }
  catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err),
    };
  }
}