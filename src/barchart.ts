import * as d3 from "d3";

interface BarProps {
  container: string;
  width: number;
  height: number;
  padding: [number, number, number, number];
}

class BarChart {
  public container: any;
  private geoms: any;
  private xScale: any; // (cat: string) => number;
  private yScale: any;
  private dataSource: any[];
  private padding: [number, number, number, number];
  private width: number;
  private height: number;
  constructor(props: BarProps) {
    const { width, height, container, padding } = props;
    this.container = d3.select(container).append("svg")
      .attr("width", width)
      .attr("height", height);
    this.padding = padding;
    this.width = width;
    this.height = height;
  }

  public data(data: any[]): void {
    this.dataSource = data;
    this.geoms = this.container.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("fill", "rgba(23, 49, 120, 0.4)");
  }
  public xField(field: string, type: "ordinal" | "quantitative") {
    if (type === "ordinal") {
      this.xScale = d3.scaleBand()
        .domain(this.dataSource.map(item => item[field]))
        .range([0, this.width - this.padding[1] - this.padding[3]])
        .paddingInner(0.1)
        .paddingOuter(0.5);
      this.geoms
        .attr("x", d => {
          return this.padding[3] + this.xScale(d[field]);
        })
        .attr("width", d => {
          return this.xScale.bandwidth();
        });
    } else {
      this.xScale = d3.scaleLinear()
        .domain([0, Math.max(...this.dataSource.map(item => item[field]))])
        .range([0, this.width - this.padding[1] - this.padding[3]]);
      this.geoms
        .attr("x", d => {
          return this.padding[3];
        })
        .attr("width", d => {
          return this.xScale(d[field]);
        });
    }
    const xAxis = d3.axisBottom(this.xScale);
    // const xAxis = this.container.append("g");
    xAxis(this.container.append("g")
      .attr("transform", `translate(${this.padding[3]}, ${this.height - this.padding[2]})`));
  }
  public yField(field: string, type: "ordinal" | "quantitative") {
    if (type === "quantitative") {
      this.yScale = d3.scaleLinear()
        .domain([0, Math.max(...this.dataSource.map(item => item[field]))])
        .range([this.height - this.padding[0] - this.padding[2], 0]);
      this.geoms
        .attr("y", d => {
          return this.padding[0] + this.yScale(d[field])
        })
        .attr("height", d => {
          return this.height - this.padding[2] - this.padding[0] - this.yScale(d[field]);
        });
    } else {
      this.yScale = d3.scaleBand()
        .domain(this.dataSource.map(item => item[field]))
        .range([this.height - this.padding[0] - this.padding[2], 0])
        .paddingInner(0.1)
        .paddingOuter(0.5);
      this.geoms
        .attr("y", d => {
          return this.padding[0] + this.yScale(d[field]);
        })
        .attr("height", d => {
          return this.yScale.bandwidth();
        });
    }
    const yAxis = d3.axisLeft(this.yScale);
    // const xAxis = this.container.append("g");
    yAxis(this.container.append("g")
      .attr("transform", `translate(${this.padding[3]}, ${this.padding[0]})`));
  }
}

export default BarChart;
