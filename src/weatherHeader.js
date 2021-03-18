import React from 'react';
import "./weatherHeader.css";
import TemperatureHeader from "./temperatureHeader";
import PrecipitationHeader from "./precipitationHeader";
import WindHeader from "./windHeader";

class WeatherHeader extends React.Component {
	render() {
		return( 
			<div className="headerBorder">
				{this.props.wCategory === "Temperature" &&
					<TemperatureHeader {... this.props}/>}
				{this.props.wCategory === "Precipitation" &&
					<PrecipitationHeader {... this.props}/>}
				{this.props.wCategory === "Wind" &&
					<WindHeader {... this.props}/>}
			</div>
		);
	}
}

export default WeatherHeader;