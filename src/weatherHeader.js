import React from 'react';
import "./weatherHeader.css";
import TemperatureHeader from "./temperatureHeader";
import PrecipitationHeader from "./precipitationHeader";
import WindHeader from "./windHeader";

class WeatherHeader extends React.Component {
	render() {
		return( 
			<div className="headerBorder">
				{this.props.type === "Temperature" &&
					<TemperatureHeader {... this.props}/>}
				{this.props.type === "Precipitation" &&
					<PrecipitationHeader {... this.props}/>}
				{this.props.type === "Wind" &&
					<WindHeader {... this.props}/>}
			</div>
		);
	}
}

export default WeatherHeader;