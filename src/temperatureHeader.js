import React from "react";
import "./weather_icons/css/weather-icons.css";

//Header for temperature widget
const TemperatureHeader = (props) => {
	return ( 
		<div style={{color: "white"}}>
			<ul style={styles.ul}>
				<li style={styles.hli}> Temperature </li> 
				<li style={styles.li}> {props[0].temp}<i className="wi wi-celsius"></i> </li>
			</ul>				
			<ul style={styles.ul}>
				<li style={styles.hli}> Feels like </li> 
				<li style={styles.li}> {props[0].feels_like}<i className="wi wi-celsius"></i> </li>
			</ul>
			<div style={{float: "right", justifyContent: "right"}}>
			</div>
	</div>
	);
}

let styles = {
	ul: {
		listStyleType: "none",
		display: "inline-block"
	},
	hli: {
		fontSize: "25px",
	},
	li: {
		fontSize: "20px"
	}
}

export default TemperatureHeader;