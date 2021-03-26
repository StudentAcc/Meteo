import React from 'react';
import "./weatherHeader.css";
import TemperatureHeader from "./temperatureHeader";
import PrecipitationHeader from "./precipitationHeader";
import WindHeader from "./windHeader";

class WeatherHeader extends React.Component {
	render() {
		console.log(this.props);
		return( 
			<div className="headerBorder">
				{this.props.type === "Temperature" &&
					<TemperatureHeader {... this.props[0].hourly}/>}
				{this.props.type === "Precipitation" &&
					<PrecipitationHeader {... this.props[0].hourly}/>}
				{this.props.type === "Wind" &&
					<WindHeader {... this.props[0].hourly}/>}
			</div>
		);
	}
}

export default WeatherHeader;