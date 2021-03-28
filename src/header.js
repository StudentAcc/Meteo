import React, {useState} from 'react';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

const Header = ({handleForecastChange, currentLocation, weekly}) => {
	const [selected, setSelected] = useState("Today");
	
	const updateSelected = (id) => {
		setSelected(id);
	}
	const handleClick = (e) => {
		e.preventDefault();
		updateSelected(e.target.id);
		handleForecastChange(e);		
		e.target.style.textDecoration = 'underline';
		const listItems = document.getElementsByClassName("headerList")[0].childNodes;
		listItems.forEach((item) => {
			if (item.id !== e.target.id) 
				item.style.textDecoration = 'none';
		});
	}
	return (
		<ul className="headerList" style={styles.ul}>
			<li id="Today" onClick={handleClick} style={styles.li}> Today </li>
			<li id="Tomorrow" onClick={handleClick} style={styles.li}> Tomorrow </li>
			{weekly && <li id="1 Week" onClick={handleClick} style={styles.li}> 1 Week </li>}
			<li style={styles.rli}> 
				<FontAwesomeIcon icon={faMapMarkerAlt}/> {currentLocation} 
			</li>
		</ul>
	)
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