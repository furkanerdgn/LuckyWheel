import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';
import { ActivityContext } from '.././context/index.jsx';
import { Box, Heading, Text } from "@chakra-ui/react";
import * as d3 from 'd3';
import { ArrowDownIcon } from '@chakra-ui/icons';

function createPieChart(containerRef, data) {
  d3.select(containerRef.current).selectAll("*").remove();
   // Set your desired stroke width here
  const height = 500;
  const width = 500;
  const customSVGPath = "M 44.7293 91.6519 C 42.7565 94.4826 38.5732 94.5046 36.5617 91.6948 L 2.48476 44.0928 C -0.56352 39.8347 4.14297 34.3568 8.81008 36.7308 L 38.8665 52.0193 C 40.3069 52.7519 42.0113 52.7444 43.4427 51.9989 L 71.6663 37.3012 C 76.3505 34.8619 81.1335 40.4161 78.0245 44.6846 L 65.0052 62.5592 L 44.7293 91.6519 Z";

  const minDimension = Math.min(width, height);
  const radius = minDimension / 2 ; // Adjust for stroke width

  const svg = d3.select(containerRef.current).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${minDimension} ${minDimension}`)
    .append("g")
    .attr("transform", `translate(${minDimension / 2},${minDimension / 2})`);

  const color = d3.scaleOrdinal(d3.schemeAccent);

  const pie = d3.pie()
    .value(function (d) { return d.desire });

  const data_ready = pie(data);

  svg.append("path")
  .attr("d", customSVGPath)
  .attr("fill", "yellow")
  .attr("transform", `translate(-${minDimension / 12},-${minDimension / 1.4})`);
  
  

  svg
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function (d, i) { return color(i); })
    .style("opacity",1);
}

function Wheel() {
  const { activities } = useContext(ActivityContext);
  const chartRef = useRef(null);// Set your desired stroke width here

  useEffect(() => {
    if (activities.length > 0) {
      createPieChart(chartRef, activities);
    }
  }, [activities]);

  return (activities.length === 0) ? (<Text>Add some activity</Text>) :
    (
      <>
        <Box width="100%" p={2} textAlign="center" alignSelf="flex-end" >
          <Heading >Wheel</Heading>
        </Box>
        <Box width="70%" ref={chartRef} height="70%" >
        </Box>
      </>
    );
}

export default Wheel;
