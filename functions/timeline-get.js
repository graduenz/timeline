const faunadb = require("faunadb");
const q = faunadb.query;

const utils = require('./utils');

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const id = utils.getId(event.path);
    const response = await client.query(q.Get(q.Ref(`classes/timelines/${id}`)));

    if (!utils.userOwns(response, user)) {
      throw {
        success: false,
        message: "This timeline does not belong to you",
      };
    }

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