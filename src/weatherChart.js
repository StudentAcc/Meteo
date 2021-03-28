import React, {useState} from 'react';
import "./weather_icons/css/weather-icons-wind.css";
import { WiWindDeg} from "weather-icons-react";
import "./wind.css";

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
						<svg x={getSVGX(coord.x)} y={getSVGY(200)} viewBox="-19 0 900 100">
							<path fill="white" className={`towards-${coord.y}-deg`} 
							d="M3.74,14.5c0-2.04,0.51-3.93,1.52-5.66s2.38-3.1,4.11-4.11s3.61-1.51,5.64-1.51c1.52,0,2.98,0.3,4.37,0.89
							  s2.58,1.4,3.59,2.4s1.81,2.2,2.4,3.6s0.89,2.85,0.89,4.39c0,1.52-0.3,2.98-0.89,4.37s-1.4,2.59-2.4,3.59s-2.2,1.8-3.59,2.39
							  s-2.84,0.89-4.37,0.89c-1.53,0-3-0.3-4.39-0.89s-2.59-1.4-3.6-2.4s-1.8-2.2-2.4-3.58S3.74,16.03,3.74,14.5z M6.22,14.5
	   						  c0,2.37,0.86,4.43,2.59,6.18c1.73,1.73,3.79,2.59,6.2,2.59c1.58,0,3.05-0.39,4.39-1.18s2.42-1.85,3.21-3.2s1.19-2.81,1.19-4.39
							  s-0.4-3.05-1.19-4.4s-1.86-2.42-3.21-3.21s-2.81-1.18-4.39-1.18s-3.05,0.39-4.39,1.18S8.2,8.75,7.4,10.1S6.22,12.92,6.22,14.5z
							  M11.11,20.35l3.75-13.11c0.01-0.1,0.06-0.15,0.15-0.15s0.14,0.05,0.15,0.15l3.74,13.11c0.04,0.11,0.03,0.19-0.02,0.25
							  s-0.13,0.06-0.24,0l-3.47-1.3c-0.1-0.04-0.2-0.04-0.29,0l-3.5,1.3c-0.1,0.06-0.17,0.06-0.21,0S11.09,20.45,11.11,20.35z"/>
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
						 <rect fill="#e4ecef" fillOpacity="0.8" transform={`translate(0 0) rotate(180 ${getSVGX(coord.x)} ${getSVGY(20)})`} style={{transition: "0.5s all"}}
						  x = {getSVGX(coord.x)} y = {getSVGY(38)} 
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
