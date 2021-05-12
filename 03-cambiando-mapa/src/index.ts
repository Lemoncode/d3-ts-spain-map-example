import * as d3 from "d3";
import * as topojson from "topojson-client";
const mapatopojson = require("./maps/simplifiedtopo.json");
const d3Composite = require("d3-composite-projections");

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

const aProjection = d3Composite.geoConicConformalSpain();
const geoPath = d3.geoPath().projection(aProjection);

const mapageojson = topojson.feature(
  mapatopojson,
  mapatopojson.objects.Municipios_IGN
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

/*
const mesh = topojson.mesh(mapatopojson);
aProjection.fitSize([chartDimensions.width, chartDimensions.height], mesh);
// Mirar esto: https://bl.ocks.org/mbostock/4060606
svg
  .append("path")
  .attr("d", geoPath(mesh))
  //.attr("fill", "none")
  .attr("stroke", "black")
*/

/*
aProjection.fitSize(
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
    alert(d.properties.name);
  });
*/
