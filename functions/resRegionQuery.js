require('dotenv').config()

const RESPONSE_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
}

const { MongoClient } = require('mongodb')

const dbName = 'Live'
const collectionName = 'ResRegion'

const url
  = 'mongodb+srv://'
  + process.env.MONGO_USER
  + ':'
  + process.env.MONGO_PASS
  + `@cluster0.elgu6.mongodb.net/${dbName}`


exports.handler = async (event, _context, _callback) => {

  const code = event.queryStringParameters.code

  if (!code) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: "Missing region code"
      }),
      headers: RESPONSE_HEADERS
    }
  }

  try {
    const client
      = new MongoClient(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

    await client.connect()

    const cursor
      = client
        .db(dbName)
        .collection(collectionName)
        .find({
          Code: code
        })
        

    const result = await cursor.toArray()

    await client.close()

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: RESPONSE_HEADERS
    }
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error }),
      headers: RESPONSE_HEADERS
    }
  }
}
