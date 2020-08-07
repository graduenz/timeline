const faunadb = require("faunadb");
const q = faunadb.query;

const utils = require('./utils');

exports.handler = async function (event) {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const alias = utils.getId(event.path);
    let response = await client.query(q.Paginate(q.Match(q.Ref("indexes/idx_timelines_shared_alias"), alias)));

    if (response.data.length < 1) {
      throw {
        success: false,
        message: `The timeline "${alias}" does not exist`,
      };
    }

    const timelineId = response.data[0].value.id;
    response = await client.query(q.Get(q.Ref(`classes/timelines/${timelineId}`)));
    
    if (!response.data[0].value.public) {
      throw {
        success: false,
        message: "This timeline is not public",
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  }
  catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err),
    };
  }
}