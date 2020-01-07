
import React from 'react';
import { extent as d3ArrayExtent } from 'd3-array';
import {
  axisBottom as d3AxisBottom,
  axisLeft as d3AxisLeft,
} from 'd3-axis';
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime,
} from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { line as d3Line } from 'd3-shape';

export default ({
  data,
  height,
  margin,
  selectX,
  selectY,
  width,
}) => {
  const xScale = d3ScaleTime()
    .domain(d3ArrayExtent(data, selectX))
    .range([0, width]);
  const yScale = d3ScaleLinear()
    .domain(d3ArrayExtent(data, selectY))
    .range([height, 0]);

  const xAxis = d3AxisBottom()
    .scale(xScale)
    .ticks(data.length / 2);
  const yAxis = d3AxisLeft()
    .scale(yScale)
    .ticks(3);

  const selectScaledX = datum => xScale(selectX(datum));
  const selectScaledY = datum => yScale(selectY(datum));

  const sparkLine = d3Line()
    .x(selectScaledX)
    .y(selectScaledY);

  const linePath = sparkLine(data);
  const circlePoints = data.map(datum => ({
    x: selectScaledX(datum),
    y: selectScaledY(datum),
  }));

  return (
    <svg
      className="container"
      contentcontainerbackgroundrectclassname="contentContainerBackgroundRect"
      contentcontainergroupclassname="contentContainer"
      height={height}
      margin={margin}
      width={width}
    >
      <g
        className="xAxis"
        ref={node => d3Select(node).call(xAxis)}
        style={{
          transform: `translateY(${height}px)`,
        }}
      />
      <g className="yAxis" ref={node => d3Select(node).call(yAxis)} />
      <g className="line">
        <path d={linePath} />
      </g>
      <g className="scatter">
        {circlePoints.map(circlePoint => (
          <circle
            cx={circlePoint.x}
            cy={circlePoint.y}
            key={`${circlePoint.x},${circlePoint.y}`}
            r={4}
          />
        ))}
      </g>
      <style jsx>{`
        .container > .contentContainer > .contentContainerBackgroundRect {
          fill: #fafafa;
        }
        
        .container > .contentContainer .xAxis text {
          font-size: 8px;
        }
        
        .container > .contentContainer .line path {
          fill: transparent;
          stroke: #29b6f6;
          stroke-width: 2;
        }
        
        .container > .contentContainer .scatter circle {
          fill: #5c6bc0;
          stroke: #fafafa;
          stroke-width: 2;
        }
      `}

      </style>
    </svg>
  );
};