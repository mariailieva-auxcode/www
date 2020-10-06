const borderdata = require('./manucipalitiesBordersNotMin')
const fs = require('fs')

const newBorderData = borderdata
    .map(i => { return {Code: i.Code, ...i.envelope} })


fs.writeFileSync('manucipalitiesBorders.json', JSON.stringify(newBorderData))

console.log('done!')