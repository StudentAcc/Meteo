import React from "react";

class TemperatureHeader extends React.Component {
	render() {
		return ( 
			<div style={{color: "white"}}>
				<ul style={styles.ul}>
					<li style={styles.hli}> Temperature </li> 
					<li style={styles.li}> {this.props[0].temp+"°C"} </li>
				</ul>				
				<ul style={styles.ul}>
					<li style={styles.hli}> Feels like </li> 
					<li style={styles.li}> {this.props[0].feels_like+"°C"} </li>
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
		fontSize: "30px",
	},
	li: {
		fontSize: "25px"
	}
}

export default TemperatureHeader;