import * as d3 from "d3";
import * as topojson from "topojson-client";
const mapatopojson = require("./maps/comunidades_autonomas.json");

const svgDimensions = { width: 1024, height: 768 };
const margin = { left: 5, right: 5, top: 10, bottom: 10 };
const chartDimensions = {
  width: svgDimensions.width - margin.left - margin.right,
  height: svgDimensions.height - margin.bottom - margin.top,
};

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", chartDimensions.width)
  .attr("height", chartDimensions.height)
  .attr("style", "background-color: #FBFAF0");

const miProyeccion = d3.geoMercator();
const geoPath = d3.geoPath().projection(miProyeccion);

const mapageojson = topojson.feature(
  mapatopojson,
  mapatopojson.objects.autonomous_regions
);

miProyeccion.fitSize(
  [chartDimensions.width, chartDimensions.height],
  mapageojson
);

svg
  .selectAll("path")
  .data(mapageojson["features"])
  .enter()
  .append("path")
  .attr("class", "contorno")
  .attr("d", geoPath as any)
  .on("click", (m, d: any) => {
    alert(d.properties.NAMEUNIT);
  });
