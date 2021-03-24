import React from "react";
import "./weather_icons/css/weather-icons.css";

class PrecipitationHeader extends React.Component {
	render() {
		return ( 
			<div style={{color: "white"}}>
				<ul style={styles.ul}>
					<li style={styles.hli}> Chance of rain </li> 
					<li style={styles.li}> {Math.round(this.props[0].pop)+"%"} </li>
				</ul>				
				<ul style={styles.ul}>
					<li style={styles.hli}> Humidity </li> 
					<li style={styles.li}> {(this.props[0].humidity)+"%"} </li>
				</ul>	
				<div style={{float: "right", justifyContent: "right"}}>
				<ul style={styles.ul}>
					<li style={styles.li}> Visibility: {Math.round((this.props[0].visibility/1000))+"km"} </li>
					<li style={styles.li}> Clouds: {this.props[0].clouds+"%"} </li>
				</ul>
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

export default PrecipitationHeader;