import React, {useState} from 'react';
import "./weather_icons/css/weather-icons-wind.css";
import { WiWindDeg} from "weather-icons-react";
import "./wind.css";

// Differents SVG weather charts - temperature, precipitation, wind
const WeatherChart = ({type, data, period}) => {
	const color = "white";
	const svgHeight = 100;
	const svgWidth = 500;

	const getMinX = () => {
		return data[0].x;
	}
	const getMaxX = () =>  {
		return data[data.length - 1].x;
	}
	const getMinY = () =>  {
		return Math.min(...data.map(d => d.y));
	}
	const getMaxY = () =>  {
		return Math.max(...data.map(d => d.y));
	}
	const getSVGX = (x) =>  {
		return ((x / getMaxX()) * svgWidth);
	}
	const getSVGY = (y) =>  {
		if (getMaxY()===0)
			return svgHeight;
		return svgHeight - ((y / getMaxY()) * svgHeight);
	}
	const drawWindChart = () =>  {
		return (
			<g>
				{data.map((coord) => (
						<svg x={getSVGX(coord.x)} y={getSVGY(200)} viewBox="-29 0 900 100">
							<path fill="white" className={`towards-${coord.y}-deg`} 
							d="M0,11.3c0-2,0.5-3.9,1.5-5.7s2.4-3.1,4.1-4.1S9.2,0,11.3,0c1.5,0,3,0.3,4.4,0.9s2.6,1.4,3.6,2.4s1.8,2.2,2.4,3.6
							s0.9,2.9,0.9,4.4c0,1.5-0.3,3-0.9,4.4s-1.4,2.6-2.4,3.6S17,21,15.6,21.6s-2.8,0.9-4.4,0.9s-3-0.3-4.4-0.9s-2.6-1.4-3.6-2.4
							S1.5,17,0.9,15.6S0,12.8,0,11.3z M2.5,11.3c0,2.4,0.9,4.4,2.6,6.2c1.7,1.7,3.8,2.6,6.2,2.6c1.6,0,3.1-0.4,4.4-1.2s2.4-1.9,3.2-3.2
							s1.2-2.8,1.2-4.4s-0.4-3.1-1.2-4.4S17,4.5,15.7,3.7s-2.8-1.2-4.4-1.2S8.2,2.9,6.9,3.7S4.5,5.5,3.7,6.9S2.5,9.7,2.5,11.3z M7.4,17.1
							L11.1,4c0-0.1,0.1-0.1,0.1-0.1s0.1,0.1,0.1,0.1l3.7,13.1c0,0.1,0,0.2,0,0.2s-0.1,0.1-0.2,0l-3.5-1.3c-0.1,0-0.2,0-0.3,0l-3.5,1.3
							c-0.1,0.1-0.2,0.1-0.2,0S7.4,17.2,7.4,17.1z"/>
						</svg>
				))}
			</g>
		);
	}
	const drawSVGBars = () => {
		return ( 
			<svg className='bars'>
				{data.map((coord) => (
					<>
					{console.log(coord.y)}
						 <rect fill="#e4ecef" fillOpacity="0.8" transform={`translate(0 -10) rotate(180 ${getSVGX(coord.x)} ${getSVGY(0)})`} style={{transition: "0.5s all"}}
						  x = {getSVGX(coord.x)} y = {getSVGY(0)} 
						  width={getSVGX(getMaxX())/data.length} height={100-getSVGY(coord.y)}/>
					</>
				))}
			</svg>
		)
	}
	const drawSVGPolygon = () => {
		let path = "";
		for (var i=0; i<data.length; i++) 
			path += ` ${getSVGX(data[i].x)},${getSVGY(data[i].y-1)}`;
		const pathl = path;
		path += ` ${getSVGX(getMaxX())},${getSVGY(1)} ${getSVGX(0)},${getSVGY(1)}`
		return (
			<svg>
		 		<polygon points={path} fill="rgba(165,186,194,0.6)" style={{strokeWidth:"1", fillOpacity: "0.6"}} />
				<polyline points={pathl} fill="none" style={{stroke: color, strokeWidth:"1"}} />
				 {drawDataPoints()}
			 </svg>
		);
	  }
	const drawXAxisLabel = () => {
		return ( 
			<g className="xLabel">
				{data.map((coord) => (		
					<text style={{fontSize: "7px",fill: "#e4ecef"}}
					 x={getSVGX(coord.x+0.01)} y={getSVGY(0)}> {period === "Hourly" ? coord.dth+":00" : coord.dth} </text>
				))}
			</g>
		);
	}
	const drawDataPoints = () => {
		return ( 
			<g className="dataPoints">
				{data.map((coord) => (
					<>
						<text style={{fontSize: "7px",fill: "#e4ecef"}}
 						 x={getSVGX(coord.x)} y={getSVGY(coord.y-0.5)}> 
							{Math.round(coord.y)} 
						</text> 		
						<circle style={{fontSize: "7px",fill: "#e4ecef"}}
						 cx={getSVGX(coord.x+0.03)} cy={getSVGY(coord.y-1)} r="2"/>
					</>
				))}
			</g>
		);
	}
	return (
		<>
			<svg style={styles.svg} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
			{type === "Temperature" && drawSVGPolygon()}				
			{type === "Precipitation" && drawSVGBars()}	
			{type === "Wind" && drawWindChart()}
			{drawXAxisLabel()}
			</svg>
		</>
	);
}

let styles = {
	svg: {
		margin: "5%",
		position: "absolute",
		top: "50%",
	}
}

export default WeatherChart;
