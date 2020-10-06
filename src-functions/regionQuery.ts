import faunadb from 'faunadb'

import { RESPONSE_HEADERS } from './api/constants/responseHeaders'

const q = faunadb.query



exports.handler = async (event, context, callback) => {

  const lat = event.queryStringParameters.lat
  const lon = event.queryStringParameters.lon

  if (!lat || !lon) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: "Missing latitute & longitude data" }),
      headers: RESPONSE_HEADERS
    }
  }

  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET
  })
  try {

    // 4.884901 52.373535
    const regionQuery = q.Map(
      q.Paginate(
        q.Intersection(
          q.Join(
            q.Range(q.Match(q.Index("regionNorth")), [+lon], []),
            q.Lambda(["value", "ref"], q.Match(q.Index("justRef"), q.Var("ref")))
          ),
          q.Join(
            q.Range(q.Match(q.Index("regionSouth")), [], [+lon]),
            q.Lambda(["value", "ref"], q.Match(q.Index("justRef"), q.Var("ref")))
          ),
          q.Join(
            q.Range(q.Match(q.Index("regionEast")), [+lat], []),
            q.Lambda(["value", "ref"], q.Match(q.Index("justRef"), q.Var("ref")))
          ),
          q.Join(
            q.Range(q.Match(q.Index("regionWest")), [], [+lat]),
            q.Lambda(["value", "ref"], q.Match(q.Index("justRef"), q.Var("ref")))
          ),
        )
      ),
      q.Lambda('ref', q.Get(q.Var('ref')))
    )

    console.log(`lat: ${lat}, lon: ${lon}`)

    const possibleRegions: any =
      await client.query(regionQuery)

    const possibleRegionCodes =
      possibleRegions.data.map(i => i.data.Code)


    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(possibleRegionCodes)
    })
  } catch (error) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ error })
    })
  }
}
