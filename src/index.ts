import * as d3 from 'd3';

const data = [
    { name: 'Alice', age: 12, value: 20 },
    { name: 'Bob', age: 17, value: 100 },
    { name: 'Carl', age: 22, value: 76 },
    { name: 'Dos', age: 28, value: 42 }
];
const padding = {
    right: 10,
    left: 10,
    top: 10,
    bottom: 10
}
const rectStep = 40;
const rectWidth = 32
const width = 400;
const height = 300;
const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
        return padding.left + rectStep * i;
    })
    .attr('y', (d, i) => {
        return height - padding.bottom - d.age * 10;
    })
    .attr('width', rectWidth)
    .attr('height', d => d.age * 10)
    .attr('fill', 'steelblue')