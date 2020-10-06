import faunadb from 'faunadb'
import * as turf from '@turf/turf'

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

    const regionQuery =
      q.Map(
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

    const possibleRegions: any =
      await client.query(regionQuery)

    const possibleRegionCodes =
      possibleRegions.data.map(i => i.data.Code)

    const polygonsQuery =
      q.Map(
        possibleRegionCodes,
        q.Lambda("Code", q.Get(q.Match(q.Index("fulldataByCode"), q.Var("Code"))))
      )

    const polygonMatchesRaw: [any] =
      await client.query(polygonsQuery)

    const polygonMatches =
      polygonMatchesRaw.map(i => i.data)

    const myPoint =
      turf.point([lat, lon])

    const match =
      []

    for (let i = 0; i < polygonMatches.length; i++) {
      if (turf.booleanPointInPolygon(myPoint, polygonMatches[i])) {
        match.push({
          Code: polygonMatches[i].properties.Code,
          Name: polygonMatches[i].properties.Gemeentenaam,
        })
        break
      }
    }

    const result =
      match.length > 0
        ? { match: true, ...match[0] }
        : { match: false }


    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(result)
    })
  } catch (error) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ error })
    })
  }
}
