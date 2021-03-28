import React from "react";
import NavBar from './navBar';
import WeatherWidget from './weatherWidget';
import Header from './header';
import { Link } from "react-router-dom";
import "./Homepage.css";

// Homepage component 
const Homepage = ({location, handleChange, handleSubmit, handleForecastChange, temp, pop, wind_speed}) => {
	return(
		<main>
			<NavBar currentLocation={location} handleInput={handleChange} handleSubmit={handleSubmit}/>
			<Header weekly={false} currentLocation={location} handleForecastChange={handleForecastChange}/>
			<div className="widgetsContainer" style={styles.widgetsContainer}>
				<Link to="/temperature">
					<WeatherWidget className="widgetTemp" style={styles.widgetTemp} name="Temperature" value={temp}/>
				</Link>
				<Link to="/precipitation">
					<WeatherWidget className="widgetPrec" style={styles.widgetPrec} name="Precipitation" value={Math.round(pop * 100)}/>
				</Link>
				<Link to="/wind">
					<WeatherWidget className="widgetWind" style={styles.widgetWind} name="Wind" value={Math.round(wind_speed * 3.6)+" km/h"}/>
				</Link>
			</div>
		</main>
	);
}


let styles = {
	widgetsContainer: {
		position: 'absolute',
		display: 'grid',
		gridTemplateColumns: 'repeat(3,1fr)',
		gridColumnGap: '20px',
		top: '25%',
		left: '4%',
		width: '90%',
	},
	widgetTemp: {
		container: {
			width: '100%',
			height: '100%',
			gridColumn: '1'
		}
  	},
    widgetPrec: {
		container: {
			width: '100%',
			height: '100%',
			gridColumn: '2'
		}
  	},
    widgetWind: {
		container: {
			width: '100%',
			height: '100%',
			gridColumn: '3'
   		}
  	}
};

export default Homepage;