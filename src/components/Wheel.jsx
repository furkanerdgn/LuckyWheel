import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';
import { ActivityContext } from '.././context/index.jsx';
import { Box, Heading, Text,Flex, Button } from "@chakra-ui/react";
import * as d3 from 'd3';
import { ChevronDownIcon } from '@chakra-ui/icons';

function createPieChart(containerRef, data) {
  d3.select(containerRef.current).selectAll("*").remove();
   // Set your desired stroke width here
  const height = 500;
  const width = 500;

  const minDimension = Math.min(width, height);
  const radius = minDimension / 2 ; // Adjust for stroke width

  const svg = d3.select(containerRef.current).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr('viewBox', `0 0 ${minDimension} ${minDimension}`)
    .append("g")
    .attr("transform", `translate(${minDimension / 2},${minDimension / 2})`);

  const color = d3.scaleOrdinal(d3.schemeAccent);

  const pie = d3.pie()
    .value(function (d) { return d.desire })

  const data_ready = pie(data);
  const data_labels = pie(data);


  var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

  svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.activities })
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)

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
      <Flex width="100%" direction="column" gap={5} justifyContent="center" alignItems="center">
        <ChevronDownIcon  color="pink.500" w={10} h={10} />
        <Box width={["90%","50%"]}  ref={chartRef} height={["50%","50%"]}   />
        <Button alignSelf="center" colorScheme="pink" variant="solid" size="lg" mt={2} mb={2} >
        spin the wheel
        </Button>
      </Flex>

      </>
    );
}

export default Wheel;
