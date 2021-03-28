import React from 'react';
import "./weatherHeader.css";
import TemperatureHeader from "./temperatureHeader";
import PrecipitationHeader from "./precipitationHeader";
import WindHeader from "./windHeader";

// Weather header component that links to each widget's own instance
const WeatherHeader = (props) => {
	return( 
		<div className="headerBorder">
			{props.type === "Temperature" &&
				<TemperatureHeader {... props[0].hourly}/>}
			{props.type === "Precipitation" &&
				<PrecipitationHeader {... props[0].hourly}/>}
			{props.type === "Wind" &&
				<WindHeader {... props[0].hourly}/>}
		</div>
	);
}

export default WeatherHeader;