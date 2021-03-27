import React, {useState} from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import { faHome, faGlobeEurope,faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { useMediaQuery } from 'react-responsive'
import "./navBar.css";

const Menu = ({handleSubmit, handleInput}) => {
	const [hasClicked, setHasClicked] = useState(false);
	const search = (e) => setHasClicked(!hasClicked);
	const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1223px)' })
	return (
		<nav className="navBar" style={styles.container}>
			<p style={isDesktop ? styles.nameDesktop : styles.nameTablet}> Meteo </p>
			<ul style={styles.ul}>
				<li style={isDesktop ? styles.listItem : styles.tabletListItem}>
					<Link style={styles.link} to="/"> 
						<FontAwesomeIcon style={isDesktop ? styles.fa : {}} className="fa" icon={faHome}/> 
					</Link>
				</li>
				<li style={isDesktop ? styles.listItem : styles.tabletListItem}>
					<Link style={styles.link} to="/map"> 
						<FontAwesomeIcon style={isDesktop ? styles.fa : {}} className="fa" icon={faGlobeEurope}/> 
					</Link>
				</li>
				{isTabletOrMobile && 
				<li style={styles.tabletListItem}>
					<div style={{width: "100%"}}>
					<FontAwesomeIcon onClick={search} className="fa" icon={faSearch}/> 
					{hasClicked && 
						<div style={{marginTop: "50px"}}> 
							<SearchBar handleInput={handleInput} handleSubmit={handleSubmit}/>
						</div>}
					</div>
				</li>}
			</ul>
			{isDesktop && <SearchBar styles={styles} handleInput={handleInput} handleSubmit={handleSubmit}/>}
		</nav>
	)
}

const NavBar = ({handleInput, handleSubmit}) => {
	return (
		<div className="menu">
			<Menu handleInput={handleInput} handleSubmit={handleSubmit}/>
		</div>
	)
}

let styles = {
	container: {
		display: 'inline-block',
		position: 'relative',
		backgroundColor: '#e4ecef',	
		width: '100%'
	},
	nameTablet: {
		fontSize: '30px',
		fontWeight: '400',
		position: 'absolute',
		marginLeft: '20px',
		marginTop: '17px',
		color: 'rgba(79,79,79,255)'
	},
	nameDesktop: {
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
	tabletListItem: {
		width: '60px',
		borderRadius: '5px',
		fontSize: '10px',
	},
	ul: {
		listStyleType: 'none',
		display: 'flex',
		justifyContent: 'center'
	},
	listItem: {
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