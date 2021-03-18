import React from 'react';

class WeatherChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: this.props.type,
			data: this.props.data,
			color: 'white',
			svgHeight: 100,
			svgWidth: 500,
		}
	}
	getMinX() {
		const {data} = this.state;
		return data[0].x;
	}
	getMaxX() {
		const {data} = this.state;
		return data[data.length - 1].x;
	}
	getMinY() {
		const {data} = this.state;
		return Math.min(...data.map(d => d.y));
	}
	getMaxY() {
		const {data} = this.state;
		return Math.max(...data.map(d => d.y));
	}
	getSVGX(x) {
		const {svgWidth} = this.state;
		return ((x / this.getMaxX()) * svgWidth);
	}
	getSVGY(y) {
		// transpose height as its top-bottom order
		const {svgHeight} = this.state;
		return svgHeight - ((y / this.getMaxY()) * svgHeight);
	}
	drawSVGBars() {
		return ( 
			<g class='bars'>
				{this.props.data.map((coord) => (
					<>
						<text style={{
							fontSize: "7px",
							fill: "#e4ecef"
						 }}
						 x={this.getSVGX(coord.x+0.05)} y={this.getSVGY(coord.y+1)}> {Math.round(coord.y)+"%"} </text>
						<polyline stroke="#ffffff" stroke-width="1"
						 points={this.getSVGX(coord.x)+","+this.getSVGY(coord.y)+" "+this.getSVGX(coord.x+0.25)+","+this.getSVGY(coord.y)}/>
						<rect fill="#e4ecef" fill-opacity="0.3" style={{transition: "0.5s all"}}
						 x = {this.getSVGX(coord.x)} y = {this.getSVGY(coord.y)} 
						 width='5%' height={coord.y-4}/>
					</>
				))}
			</g>
		)
	}
	drawSVGPolygon() {
		const {data, color} = this.state;
		let path = "";
		for (const coord of data)
			path += ` ${this.getSVGX(coord.x)},${this.getSVGY(coord.y-1)}`;
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
			<g class="xLabel">
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
			<g class="dataPoints">
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
		const {svgHeight, svgWidth} = this.state;
		return (
			<>
			  <svg style={{margin: "5%"}} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
				{this.state.type === "Temperature" && this.drawSVGPolygon()}				
				{this.state.type === "Precipitation" && this.drawSVGBars()}	
				{/* {this.state.type === "Wind" && this.drawArrows()} */}
				{this.drawXAxisLabel()}
			  </svg>
			</>
		);
	}
}

export default WeatherChart;
