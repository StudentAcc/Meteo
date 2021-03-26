import React from 'react';
import "./weather_icons/css/weather-icons-wind.css";
// import "./weather_icons/css/weather-icons.css";
import { WiWindDeg} from "weather-icons-react";
import "./wind.css";

class WeatherChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: this.props.type,
			data: this.props.data,
			color: 'white',
			svgHeight: 100,
			svgWidth: 500,
			hasMounted: true
		}
	}
	getMinX() {
		const data = this.props.data;
		return data[0].x;
	}
	getMaxX() {
		const data = this.props.data;
		return data[data.length - 1].x;
	}
	getMinY() {
		const data = this.props.data;
		return Math.min(...data.map(d => d.y));
	}
	getMaxY() {
		const data = this.props.data
		return Math.max(...data.map(d => d.y));
	}
	getSVGX(x) {
		const {svgWidth} = this.state;
		return ((x / this.getMaxX()) * svgWidth);
	}
	getSVGY(y) {
		// transpose height as its top-bottom order
		const {svgHeight} = this.state;
		if (this.getMaxY()===0)
			return svgHeight;
		return svgHeight - ((y / this.getMaxY()) * svgHeight);
	}
	drawWindChart() {
		return (
			<g>
				{this.props.data.map((coord) => (
						<svg x={this.getSVGX(coord.x)} y={this.getSVGY(200)} viewBox="-19 0 900 100">
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
	drawSVGBars() {
		return ( 
			<g className='bars'>
				{this.props.data.map((coord) => (
					<>
					{console.log(coord.y)}

						{/* <text style={{
							fontSize: "7px",
							fill: "#e4ecef"
						 }}
						 x={this.getSVGX(coord.x+0.05)} y={4-this.getSVGY(coord.y+1)}> {Math.round(coord.y)+"%"} </text>
						<polyline stroke="#ffffff" stroke-width="1"
						 points={this.getSVGX(coord.x)+","+this.getSVGY(coord.y)+" "+this.getSVGX(coord.x+0.25)+","+this.getSVGY(coord.y)}/> */}
						<rect fill="#e4ecef" fillOpacity="0.3" transform={`translate(40 -2) rotate(180 ${this.getSVGX(coord.x)} ${this.getSVGY(20)})`} style={{transition: "0.5s all"}}
						 x = {this.getSVGX(coord.x)} y = {this.getSVGY(34)} 
						 width='20px' height={coord.y+"px"}/>
					</>
				))}
			</g>
		)
	}
	drawSVGPolygon() {
		const {color} = this.state;
		const data = this.props.data;
		let path = "";
		console.log("looping...");
		for (var i=0; i<data.length; i++) {
			path += ` ${this.getSVGX(data[i].x)},${this.getSVGY(data[i].y-1)}`;
		}
		const pathl = path;
		path += ` ${this.getSVGX(this.getMaxX())},${this.getSVGY(1)} ${this.getSVGX(0)},${this.getSVGY(1)}`
		return (
			<svg>
		 		<polygon points={path} fill="rgba(165,186,194,0.6)" style={{strokeWidth:"1", fillOpacity: "0.6"}} />
				<polyline points={pathl} fill="none" style={{stroke: color, strokeWidth:"1"}} />
				 {this.drawDataPoints()}
			 </svg>
		);
	  }
	drawXAxisLabel() {
		return ( 
			<g className="xLabel">
				{this.props.data.map((coord) => (		
					<text style={{
						fontSize: "7px",
						fill: "#e4ecef"
					}}
					x={this.getSVGX(coord.x+0.01)} y={this.getSVGY(0)}> {coord.dth} </text>
				))}
			</g>
		);
	}
	drawDataPoints() {
		return ( 
			<g className="dataPoints">
				{this.props.data.map((coord) => (
					<>
						<text style={{
							fontSize: "7px",
							fill: "#e4ecef"
						}}
						x={this.getSVGX(coord.x)} y={this.getSVGY(coord.y-0.5)}> 
							{(Math.round(coord.y*10)/10)+"°C"} 
						</text> 		
						<circle style={{
							fontSize: "7px",
							fill: "#e4ecef"
						}}
						cx={this.getSVGX(coord.x+0.05)} cy={this.getSVGY(coord.y-1)} r="2"/>
					</>
				))}
			</g>
		);
	}
	render() {
		const {hasMounted} = this.state;
		if (!hasMounted) 
			return <h1> Please wait </h1>
		const {svgHeight, svgWidth} = this.state;
		return (
			<>
			  <svg style={styles.svg} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
				{this.state.type === "Temperature" && this.drawSVGPolygon()}				
				{this.state.type === "Precipitation" && this.drawSVGBars()}	
				{this.state.type === "Wind" && this.drawWindChart()}
				{this.drawXAxisLabel()}
			  </svg>
			</>
		);
	}
}

let styles = {
	svg: {
		margin: "5%",
		position: "absolute",
		top: "50%",
	}
}
export default WeatherChart;
