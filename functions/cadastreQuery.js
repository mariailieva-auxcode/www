require('dotenv').config()

const RESPONSE_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
}

const turf = require('@turf/turf')

const { MongoClient } = require('mongodb')

const dbName = 'Live'
const collectionName = 'Cadastre'

const url
  = 'mongodb+srv://'
  + process.env.MONGO_USER
  + ':'
  + process.env.MONGO_PASS
  + `@cluster0.elgu6.mongodb.net/${dbName}`


exports.handler = async (event, context, callback) => {

  //convert to number
  const NORTH = +event.queryStringParameters.north
  const SOUTH = +event.queryStringParameters.south
  const EAST = +event.queryStringParameters.east
  const WEST = +event.queryStringParameters.west

  if (!NORTH || !SOUTH || !EAST || !WEST) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: "Missing or invalid latitute & longitude data"
      }),
      headers: RESPONSE_HEADERS
    }
  }

  const NW = turf.point([WEST, NORTH])
  const SE = turf.point([EAST, SOUTH])

  // in metres
  const radius
    = turf
      .distance(NW, SE, { units: 'kilometers' })
    / 1000
    / 2

  const center
    = turf
      .center(turf.featureCollection([NW, SE]))
      .geometry
      .coordinates

  try {


    const client
      = new MongoClient(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

    await client.connect()

    const cursor
      = await client
        .db(dbName)
        .collection(collectionName)
        .find(
          {
            polygon:
            {
              $near:
              {
                $geometry: {
                  type: "Point",
                  coordinates: center
                },
                $minDistance: 0,
                $maxDistance: radius
              }
            }
          }
        )

    const result = await cursor.toArray()


    await client.close()

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: RESPONSE_HEADERS
    })
  } catch (error) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ error }),
      headers: RESPONSE_HEADERS
    })
  }
}
