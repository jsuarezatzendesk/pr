const fs = require('fs')
const csv = require('binary-csv')
const base = JSON.parse(fs.readFileSync('./municipios.geojson').toString())
const data = fs.createReadStream('./cell-sites-9-25-2017.csv')

"".in

data.pipe(csv({json: true}))
  .on('data', row => {
    const feature = base.features
      .filter(f => f.properties.name)
      .filter(f => f.properties.name.localeCompare(row.County  + ' Municipio, PR', 'es', {sensitivity: 'base'}) == 0)
      [0]
    console.log(row.County, feature.properties)
    Object.assign(feature.properties, row)
  })
  .on('end', () => {

    fs.writeFileSync('./cell-sites.geojson', new Buffer(JSON.stringify(base)))
    console.log('done')
  })
