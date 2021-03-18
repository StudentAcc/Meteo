import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import { BrowserRouter as Router, /*Route, Switch*/ } from "react-router-dom";
import { faHome, faSatelliteDish, faGlobeEurope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
// import App from './App'

class NavBar extends React.Component {
	render() {
	  return (
		  <Router>
			<nav className="navBar" style={styles.container}>
				<p style={styles.appName}> Meteo </p>
				<ul style={styles.ul}>
					<li style={styles.li}>
						<Link style={styles.link} to={this.props.currentLocation}> 
							<FontAwesomeIcon style={styles.fa} icon={faHome}/> 
						</Link>
					</li>
					<li style={styles.li}>
						<Link style={styles.link} to="/satellite"> 
							<FontAwesomeIcon style={styles.fa}  icon={faSatelliteDish}/> 
						</Link>
					</li>
					<li style={styles.li}>
						<Link style={styles.link} to="/satellite"> 
							<FontAwesomeIcon style={styles.fa}  icon={faGlobeEurope}/> 
						</Link>
					</li>
				</ul>
				{/* <Switch>
					<Route path="/:currentLocation" component={App}/>
					<Route path="/satellite" component={Satellite}/>
					<Route path="/world" component={World}/>
				</Switch> */}
				<SearchBar handleInput={this.props.handleInput} handleSubmit={this.props.handleSubmit}/>
		</nav>
		</Router>
		)
	}
}

let styles = {
	container: {
		display: 'inline-block',
		position: 'relative',
		backgroundColor: '#e4ecef',	
		width: '100%'
	},
	appName: {
		fontSize: '30px',
		fontWeight: '400',
		position: 'absolute',
		marginLeft: '20px',
		marginTop: '27px',
		color: 'rgba(79,79,79,255)'
	},
	link: {
		textDecoration: 'none',
	},
	ul: {
		listStyleType: 'none',
		display: 'flex',
		justifyContent: 'center'
	},
	li: {
		position: 'relative',
		backgroundColor: '#ffffff',
		marginLeft: '2px',
		width: '80px',
		height: '40px',
		paddingTop: '10px',
		textAlign: 'center',
		borderRadius: '5px',
		fontSize: '30px',
	},
	fa: {
		color: '#4f4f4f'
	}
};

export default NavBar;