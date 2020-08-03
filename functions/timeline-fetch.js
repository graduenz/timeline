const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    const response = await client.query(q.Paginate(q.Match(q.Ref("indexes/idx_timelines_user_id"), user.sub)));
    const getAllQuery = response.data.map(r => q.Get(r));
    const entities = await client.query(getAllQuery);

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