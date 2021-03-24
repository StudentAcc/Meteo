import React from "react";
import "./weather_icons/css/weather-icons.css";

class TemperatureHeader extends React.Component {
	render() {
		return ( 
			<div style={{color: "white"}}>
				<ul style={styles.ul}>
					<li style={styles.hli}> Temperature </li> 
					<li style={styles.li}> {this.props[0].temp}<i className="wi wi-celsius"></i> </li>
				</ul>				
				<ul style={styles.ul}>
					<li style={styles.hli}> Feels like </li> 
					<li style={styles.li}> {this.props[0].feels_like}<i className="wi wi-celsius"></i> </li>
				</ul>
				<div style={{float: "right", justifyContent: "right"}}>
				{/* <ul style={styles.ul}>
					<li style={styles.li}> High: {this.props.daily[0].temp.max+"°C"} </li>
					<li style={styles.li}> Low: {this.props.daily[0].temp.min+"°C"} </li>
				</ul> */}
				</div>
		</div>
		);
	}
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