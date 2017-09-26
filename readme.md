# maps and data sets

## cell-sites
permalink map: https://github.com/jsuarezatzendesk/pr/blob/master/maps/cell-sites.geojson

Shows percentage of unworking cell sites by municipio (county) in Puerto Rico.

More than 85% out = red
40 - 80% out = yellow
Less than 40% out = green

from: https://www.fcc.gov/maria "Communications Status Reports"
update frequency: daily
notes: I manually compile the CSV from the TXT version of the daily status reports, then run `node cell-sites.js` to generate `cell-sites.geojson`

