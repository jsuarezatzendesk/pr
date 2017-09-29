const updated = '9-29-2017'

const fs = require('fs')
const csv = require('binary-csv')
const base = JSON.parse(fs.readFileSync('./municipios.geojson').toString())
const data = fs.createReadStream('./cell-sites-' + updated + '.csv')

function colors(pct) {
  pct = parseFloat(pct)
  if (pct > 85) {
    return '#ff0000' // red
  }
  if (pct > 40) {
    return '#ffff00' // yellow
  }
  return '#00ff00' // green
}

data.pipe(csv({json: true}))
  .on('data', row => {
    const feature = base.features
      .filter(f => f.properties.name)
      .filter(f => f.properties.name.localeCompare(row.County  + ' Municipio, PR', 'es', {sensitivity: 'base'}) == 0)
      [0]
    console.log(row.County, feature.properties)

    Object.assign(feature.properties, row)
    delete feature.properties.County
    delete feature.properties.geoid

    feature.properties.updated = updated
    feature.properties.fill = colors(row['Percent Out'])
  })
  .on('end', () => {

    fs.writeFileSync('./cell-sites.geojson', new Buffer(JSON.stringify(base)))
    console.log('done')
  })
