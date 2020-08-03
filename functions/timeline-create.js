const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  try {
    if (!user.sub) {
      throw {
        success: false,
        message: "You are not logged in",
      };
    }

    const now = new Date().toISOString();
    const data = {
      ...JSON.parse(event.body),
      level: "custom",
      public: false,
      shared_alias: null,
      user_id: user.sub,
      created_at: now,
      updated_at: now,
    };
    const response = await client.query(q.Create(q.Ref("classes/timelines"), { data }));

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