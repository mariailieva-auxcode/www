require('dotenv').config()

const regdata = require('./mydata')

const faunadb = require('faunadb')

const q = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET
})

async function go(len) {
  for (let i = 0; i < len; i++) {
    console.log(`im at ${i}th possition`)
    try {
      await client.query(
            q.Create(
             q.Collection("region_fulldata"), { data: regdata[i]  }
            )
      )
    } catch (err) {
      console.log(`OPPS: ${err}`)
    }
  }
}

go(regdata.length)
