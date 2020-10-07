const RESRegions = require('./RESRegions')

require('dotenv').config()

const faunadb = require('faunadb')

const fs = require('fs')

const q =
    faunadb.query

const client =
    new faunadb.Client({
        secret: process.env.FAUNA_SECRET
    })



async function getCodes() {
    const resRegionByManucipality =
        []

    for (const region in RESRegions) {
        for (const manucipality of RESRegions[region]) {

            const regionQuery =
                q.Paginate(q.Match(q.Index('regionCodeByName'), manucipality))

            const data =
                await client.query(regionQuery)

            if (data.data.length === 0) {
                console.log(`opps: ${manucipality}`)
                break
            }

            resRegionByManucipality
                .push({
                    Code: data.data[0][0],
                    RESRegion: region
                })

        }
    }

    return resRegionByManucipality
}

async function saveRESRegions() {
    try {
        const resRegionByManucipality
            = await getCodes()

        fs.writeFileSync(
            './scripts/RESRegionByManucipality1.json',
            JSON.stringify(resRegionByManucipality)
        )
    } catch (err) {
        console.log(err)
    }
}

saveRESRegions()



