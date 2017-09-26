const fs = require('fs')
const base = fs.readFileSync('./municipios.geojson').toString()

fs.writeFileSync('./cell-sites.geojson', new Buffer(base))
console.log('done')