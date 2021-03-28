import React from "react";
import "./weather_icons/css/weather-icons.css";
import "./weather_icons/css/weather-icons-wind.css";

//Header for wind widget
const WindHeader = (props) => {
	const getDirection = () => {
		const {wind_deg} = props[0];
		if(wind_deg >= 349 && wind_deg <= 11) return "N";
		else if (wind_deg >= 12 && wind_deg <= 33) return "NNE"
		else if (wind_deg >= 34 && wind_deg <= 56) return "NE";
		else if (wind_deg >= 57 && wind_deg <= 78) return "ENE";
		else if (wind_deg >= 79 && wind_deg <= 101) return "E";
		else if (wind_deg >= 102 && wind_deg <= 123) return "ESE";
		else if (wind_deg >= 124 && wind_deg <= 146) return "SE";
		else if (wind_deg >= 147 && wind_deg <= 168) return "SSE";
		else if (wind_deg >= 169 && wind_deg <= 191) return "S";
		else if (wind_deg >= 192 && wind_deg <= 213) return "SSW";
		else if (wind_deg >= 214 && wind_deg <= 236) return "SW";
		else if (wind_deg >= 237 && wind_deg <= 258) return "WSW";
		else if (wind_deg >= 259 && wind_deg <= 281) return "W";
		else if (wind_deg >= 282 && wind_deg <= 303) return "WNW";
		else if (wind_deg >= 304 && wind_deg <= 326) return "NW";
		else if (wind_deg >= 327 && wind_deg <= 348) return "NNW";
	}
	return ( 
		<div style={{color: "white"}}>
			<ul style={styles.ul}>
				<li style={styles.hli}> Speed </li> 
				<li style={styles.li}> {Math.round(props[0].wind_speed*3.6)+"km/h"} </li>
			</ul>				
			<ul style={styles.ul}>
				<li style={styles.hli}> Direction </li> 
				<li style={styles.li}> <i className={`wi wi-wind towards-${props[0].wind_deg}-deg`}></i> {getDirection()}</li>
			</ul>
			<div style={{float: "right", justifyContent: "right"}}>
			<ul style={styles.ul}>
				<li style={styles.li}> Gust: {Math.round(props[0].wind_gust*3.6)+"km/h"} </li>
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

export default WindHeader;