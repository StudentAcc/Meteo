import React from "react";
import NavBar from './navBar';
import WeatherWidget from './weatherWidget';
import Header from './header';
import Geocode from "react-geocode";
import { Link } from "react-router-dom";
import "./Homepage.css";

class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasMounted: false
		}
	}
	 componentDidMount() {
		  this.setState({hasMounted: true});
	  }
	  render() {
		  const { hasMounted } = this.state;
		  if (!hasMounted) 
			return <h1> Please wait </h1>
		return(
			<main>
				<NavBar currentLocation={this.props.location} handleInput={this.props.handleChange} handleSubmit={this.props.handleSubmit}> </NavBar>
				<Header currentLocation={this.props.location} handleForecastChange={this.props.handleForecastChange}></Header>
				<div className="widgetsContainer" style={styles.widgetsContainer}>
					<Link to="/temperature">
						<WeatherWidget className="widgetTemp" style={styles.widgetTemp} name="Temperature" value={this.props.temp}/>
					</Link>
					<Link to="/precipitation">
						<WeatherWidget className="widgetPrec" style={styles.widgetPrec} name="Precipitation" value={Math.round(this.props.pop * 100)}/>
					</Link>
					<Link to="/wind">
						<WeatherWidget className="widgetWind" style={styles.widgetWind} name="Wind" value={Math.round(this.props.wind_speed * 3.6)+" km/h"}/>
					</Link>
				</div>
			</main>
		);
	}
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