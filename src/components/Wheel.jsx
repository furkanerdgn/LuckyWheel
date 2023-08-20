import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';
import { ActivityContext } from '.././context/index.jsx';
import { Box,Text } from "@chakra-ui/react";
import * as d3 from 'd3';


function createPieChart(containerRef, data) {

  d3.select(containerRef.current).selectAll("*").remove();

    const height = containerRef.current.clientHeight;
    const width = containerRef.current.clientWidth;

    const svg = d3.select(containerRef.current).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);
  
  const radius = Math.min(width, height) / 2;


  const color = d3.scaleOrdinal(d3.schemeAccent);

  const pie = d3.pie()
  .value(function(d) {return d.desire}); // Accessing the 'value' property

const data_ready = pie(data); // Passing the data array directly


// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d, i) { return color(i); }) // Using the color scale based on index
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7);
}

function Wheel() {
  const { activities } = useContext(ActivityContext);
  const chartRef = useRef(null);

  useEffect(() => {
    if (activities.length > 0) {
      createPieChart(chartRef, activities);
    }
  }, [activities]);

  return (activities.length === 0) ? (<Text>Add some activity</Text>) : 
  (<Box width="70%" ref={chartRef} height="70%" >
  </Box>);
}

export default Wheel;
