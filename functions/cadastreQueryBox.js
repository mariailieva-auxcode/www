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

  const NW = [WEST, NORTH]
  const SW = [WEST, SOUTH]
  const SE = [EAST, SOUTH]
  const NE = [EAST, NORTH]

  const viewBox
    = turf.polygon([[NW, SW, SE, NE, NW]]);

  // area in square meters
  const area = turf.area(viewBox)


  if (area > 5000 * 5000) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: "View aria greater than 25 km^2"
          + "- the query may take too long. So aborted."
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
      = await client
        .db(dbName)
        .collection(collectionName)
        .find({
          polygon: {
            $geoWithin: {
              $geometry: {
                type: "Polygon",
                coordinates: [
                  [ // the counterclockwise order is key
                    NW,
                    SW,
                    SE,
                    NE,
                    NW
                  ]
                ],
                crs: {
                  type: "name",
                  properties: {
                    name: "urn:x-mongodb:crs:strictwinding:EPSG:4326"
                  }
                }
              }
            }
          }
        })


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
