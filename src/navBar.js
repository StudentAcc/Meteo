import React, {useState} from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import { BrowserRouter as Router, /*Route, Switch*/ } from "react-router-dom";
import { faHome, faGlobeEurope, faPlus, faSearch,faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { useMediaQuery } from 'react-responsive'
import "./navBar.css";


const Menu = ({handleSubmit, handleInput}) => {
	return (
	<nav className="navBar" style={styles.container}>
		<p style={styles.appName}> Meteo </p>
		<ul style={styles.ul}>
			<li style={styles.li}>
				<Link style={styles.link} to="/"> 
					<FontAwesomeIcon style={styles.fa} icon={faHome}/> 
				</Link>
			</li>
			<li style={styles.li}>
				<Link style={styles.link} to="/map"> 
					<FontAwesomeIcon style={styles.fa}  icon={faGlobeEurope}/> 
				</Link>
			</li>
		</ul>
		<SearchBar styles={styles} handleInput={handleInput} handleSubmit={handleSubmit}/>
	</nav>
	)
}

const TabletMenu = ({handleSubmit, handleInput}) => {
	const [hasClicked, setHasClicked] = useState(false);
	const search = (e) => setHasClicked(!hasClicked);
	return (
		<ul style={styles.ul}>
			<li style={styles.tabletListItem}>
				<Link style={styles.link} to="/"> 
					<FontAwesomeIcon className="fa" icon={faHome}/> 
				</Link>
			</li>
			<li style={styles.tabletListItem}>
				<Link style={styles.link} to="/map"> 
					<FontAwesomeIcon className="fa" icon={faGlobeEurope}/> 
				</Link>
			</li>
			<li style={styles.tabletListItem}>
				<div style={{width: "100%"}}>
				<FontAwesomeIcon onClick={search} className="fa" icon={faSearch}/> 
				{hasClicked && <SearchBar handleInput={handleInput} handleSubmit={handleSubmit}/>}
				</div>
			</li>
		</ul>
	)
}

const NavBar = ({handleInput, handleSubmit}) => {
	const [hasClicked, setHasClicked] = useState(false);
	const [icons, setIcon] = useState(faPlus);

	const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' })
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1223px)' })
	
	const showOptions = (e) => {
		!hasClicked ? setIcon(faTimes) : setIcon(faPlus)
		setHasClicked(!hasClicked);
	}
	return (
		<Router>
			<div className="menu">
				{isDesktop &&  <Menu handleInput={handleInput} handleSubmit={handleSubmit}/>}
				{isTabletOrMobile && 
					<div className="hamburguerMenu">
					<ul style={styles.menuList}>
						<li> <FontAwesomeIcon onClick={showOptions} className="bars" icon={icons}/> </li>
						<li style={styles.menuListItem}> 
							{hasClicked && <TabletMenu handleInput={handleInput} handleSubmit={handleSubmit}/>} 
						</li>
					</ul>
				</div>
				}
			</div>
	</Router>
	)
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
	menuList: {
		listStyleType: 'none',
		display: 'flex',
	},
	menuListItem: {
		width: '80%',
	},
	tabletListItem: {
		marginLeft: "30px",
		width: '5%',
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