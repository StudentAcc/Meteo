import React from "react";

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
				<ul style={styles.ul}>
					<li style={styles.hli}> Dew Point </li> 
					<li style={styles.li}> {this.props[0].dew_point} </li>
				</ul>
				<div style={{float: "right", justifyContent: "right"}}>
				<ul style={styles.ul}>
					<li style={styles.li}> Visibility: {this.props[0].visibility} </li>
					<li style={styles.li}> Clouds: {this.props[0].clouds} </li>
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

export default PrecipitationHeader;