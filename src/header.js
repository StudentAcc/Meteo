import React from 'react';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

class Header extends React.Component {
	render() {
		return (
			<ul style={styles.ul}>
				<li style={styles.li}> Today </li>
				<li style={styles.li}> Tomorrow </li>
				<li style={styles.li}> 1 Week </li>
				<li style={styles.li}> 
					<FontAwesomeIcon icon={faMapMarkerAlt}/> {this.props.currentLocation} 
				</li>
			</ul>
			)
	}
}

let styles = {
	ul: {
		position: 'absolute',
		listStyleType: 'none',
		display: 'flex',
		justifyContent: 'left',
		color: '#ffffff',
	},
	li: {
		margin: '0 30px 0 0',
	}
}
export default Header;