const div = document.getElementById('root')
const svg = d3.select(div).append('svg')

const margin = { top: 25, right: 50, bottom: 50, left: 50 }

let width = div.clientWidth
let height = div.clientHeight

const rawData = d3
  .csv(
    'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv'
  )
  .then(function (data) {
    console.log(data)
  })

svg.attr('width', width).attr('height', height)

const projection = d3.geoAlbersUsa().scale(700)

const path = d3.geoPath()

const g = svg.append('g')

d3.json(
  'https://cdn.jsdelivr.net/npm/us-atlas@3.0.0/counties-albers-10m.json'
).then(function (topology) {
  console.log(topology)
  g.selectAll('path')
    .data(topojson.feature(topology, topology.objects.counties).features)
    .enter()
    .append('path')
    .attr('d', path)

  g.append('path')
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-linejoin', 'round')
    .attr('d', path)
})
