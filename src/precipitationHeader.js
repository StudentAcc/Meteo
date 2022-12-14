import React from "react";
import "./weather_icons/css/weather-icons.css";

//Header for precipitation widget
const PrecipitationHeader = (props) => {
	return ( 
		<div style={{color: "white"}}>
			<ul style={styles.ul}>
				<li style={styles.hli}> Chance of rain </li> 
				<li style={styles.li}> {Math.round(props[0].pop)+"%"} </li>
			</ul>				
			<ul style={styles.ul}>
				<li style={styles.hli}> Humidity </li> 
				<li style={styles.li}> {(props[0].humidity)+"%"} </li>
			</ul>	
			<div style={{float: "right", justifyContent: "right"}}>
			<ul style={styles.ul}>
				<li style={styles.li}> Visibility: {Math.round((props[0].visibility/1000))+"km"} </li>
				<li style={styles.li}> Clouds: {props[0].clouds+"%"} </li>
			</ul>
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

export default PrecipitationHeader;