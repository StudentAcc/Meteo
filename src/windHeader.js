import React from "react";

class WindHeader extends React.Component {
	render() {
		return ( 
			<div style={{color: "white"}} className="temperatureHeaderInfo">
				<ul style={styles.ul}>
					<li style={styles.hli}> Speed </li> 
					<li style={styles.li}> {this.props.hourly[0].wind_speed+"km/h"} </li>
				</ul>				
				<ul style={styles.ul}>
					<li style={styles.hli}> Direction </li> 
					<li style={styles.li}> {this.props.hourly[0].wind_deg} </li>
				</ul>
				<div style={{float: "right", justifyContent: "right"}}>
				<ul style={styles.ul}>
					<li style={styles.li}> Gust: {this.props.daily[0].wind_gust} </li>
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
		fontSize: "30px",
	},
	li: {
		fontSize: "25px"
	}
}

export default WindHeader;