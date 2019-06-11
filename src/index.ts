import * as d3 from "d3";
import BarChart from './barchart';

const data = [
    { name: 'Alice', age: 12, value: 20 },
    { name: 'Bob', age: 17, value: 100 },
    { name: 'Carl', age: 22, value: 76 },
    { name: 'Dos', age: 28, value: 42 },
    { name: 'Erik', age: 10, value: 120 }
];
const charts = ["oridinal-oridinal", "oridinal-quantitative"]
d3.select("body").selectAll("div")
    .data(charts)
    .enter()
    .append("div")
    .append("p")
    .text("node")
const bar = new BarChart({
    container: "#app",
    width: 400,
    height: 300,
    padding: [10, 10, 30, 30]
});

// bar.data(data);
// bar.yField("name", "ordinal");
// bar.xField("value", "quantitative");

bar.data(data);
bar.yField("age", "quantitative");
bar.xField("value", "quantitative");

// bar.data(data);
// bar.xField("name", "ordinal");
// bar.yField("value", "quantitative");