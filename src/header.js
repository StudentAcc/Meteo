import React from 'react';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: "Today"
		}
		this.handleClick = this.handleClick.bind(this);	
	}
	updateSelected(id) {
		this.setState({selected: id});
	}
	handleClick(e) {
		e.preventDefault();
		this.updateSelected(e.target.id);
		this.props.handleForecastChange(e);		
		e.target.style.textDecoration = 'underline';
		const listItems = document.getElementsByClassName("headerList")[0].childNodes;
		listItems.forEach((item) => {
			if (item.id !== e.target.id) 
				item.style.textDecoration = 'none';
		});
	}
	render() {
		return (
			<ul className="headerList" style={styles.ul}>
				<li id="Today" onClick={(e) => {this.handleClick(e);}} style={styles.li}> Today </li>
				<li id="Tomorrow" onClick={(e) => {this.handleClick(e);}} style={styles.li}> Tomorrow </li>
				<li id="1 Week" onClick={(e) => {this.handleClick(e);}} style={styles.li}> 1 Week </li>
				<li style={styles.rli}> 
					<FontAwesomeIcon icon={faMapMarkerAlt}/> {this.props.currentLocation} 
				</li>
			</ul>
			)
	}
}

let styles = {
	ul: {
		position: 'relative',
		listStyleType: 'none',
		display: 'flex',
		color: '#ffffff',
	},
	li: {
		margin: '0 30px 0 0',
	},
	rli: {
		position: 'relative',
		flex: '1',
		textAlign: 'right',
		paddingRight: '2%'
	}
}
export default Header;