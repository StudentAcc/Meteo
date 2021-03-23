import React from 'react';
import "./weather_icons/css/weather-icons-wind.min.css";
import "./weather_icons/css/weather-icons.min.css";

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
					<text x={this.getSVGX(coord.x)} y={this.getSVGY(0)}>
						<i className="wi wi-wind from-90-deg"/> 
					</text>
				))}
			</g>
		);
	}
	drawSVGBars() {
		return ( 
			<g className='bars'>
				{this.props.data.map((coord) => (
					<>
						<text style={{
							fontSize: "7px",
							fill: "#e4ecef"
						 }}
						 x={this.getSVGX(coord.x+0.05)} y={4-this.getSVGY(coord.y+1)}> {Math.round(coord.y)+"%"} </text>
						<polyline stroke="#ffffff" stroke-width="1"
						 points={this.getSVGX(coord.x)+","+this.getSVGY(coord.y)+" "+this.getSVGX(coord.x+0.25)+","+this.getSVGY(coord.y)}/>
						<rect fill="#e4ecef" fill-opacity="0.3" transform="rotate(180 247 50)"  style={{transition: "0.5s all"}}
						 x = {this.getSVGX(coord.x)} y = {8-this.getSVGY(coord.y)} 
						 width='5%' height={coord.y}/>
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
			  <svg style={{margin: "5%"}} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
				{this.state.type === "Temperature" && this.drawSVGPolygon()}				
				{this.state.type === "Precipitation" && this.drawSVGBars()}	
				{/* {this.state.type === "Wind" && this.drawWindChart()} */}
				{this.drawXAxisLabel()}
			  </svg>
			</>
		);
	}
}

export default WeatherChart;
