import React from "react";
import NavBar from './navBar';
import WeatherWidget from './weatherWidget';
import weatherBackground from './weatherDescriptions';
import Header from './header';
import Geocode from "react-geocode";
import { Link } from "react-router-dom";
import "./Homepage.css";

class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: this.props.location,
			temperature: this.props.current.temp,
			precipitation: Math.round(this.props.hourly[0].pop * 100),
			windSpeed: Math.round(this.props.current.wind_speed * 3.6),
			windDegrees: this.props.current.wind_deg,
			weatherDescription: this.props.current.weather[0].main,
			date: (new Date(this.props.current.dt * 1000)).toLocaleDateString("en-GB"),
			current: this.props.current,
			hourly: this.props.hourly,
			daily: this.props.daily,
			hasMounted: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleForecastPeriodChange = this.handleForecastPeriodChange.bind(this);
	  }
	  handleSearchLocation(e) {
		e.preventDefault();
		const location = this.state.value; 
		Geocode.fromAddress(location).then((res) => {
		  const {lat, lng} = res.results[0].geometry.location;
		  const key = "3a272e399eccb14fac2be5eeca1b5d00";
		  const forecast = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&appid=${key}&units=metric`
		  fetch(forecast).then(res => res.json())
		  .then((data) => {
			console.log(data);
			this.setLocationWeatherData(location, data.current, data.hourly[0].pop);
			this.setState({current: data.current, hourly: data.hourly, daily: data.daily});
		  }, (err) => {
			console.log(err); 
		  });
		}, (err) => {
		  console.log(err);
	   });
	  }
	  handleForecastPeriodChange(e) {
		e.preventDefault();
		if (e.target.id === 'Today') {
			this.setState({
				temperature: this.state.current.temp, 
				precipitation: Math.round(this.state.hourly[0].pop * 100),
				windSpeed: Math.round(this.state.current.wind_speed * 3.6),
				windDegrees: this.state.current.wind_deg,
				weatherDescription: this.state.current.weather[0].main,
				date: (new Date(this.state.current.dt * 1000)).toLocaleDateString("en-GB")
			}); 
		} else if (e.target.id === 'Tomorrow') {
			this.setState({
				temperature: this.state.daily[1].temp.day,
				precipitation: Math.round(this.state.daily[1].pop * 100),
				windSpeed: Math.round(this.state.daily[1].wind_speed * 3.6),
				windDegrees: this.state.daily[1].wind_deg,
				weatherDescription: this.state.daily[1].weather[0].main,
				date: (new Date(this.state.daily[1].dt * 1000)).toLocaleDateString("en-GB")
				}); 
		}
	}
	setLocationWeatherData(loc, data, pop) {
		this.setState({
		  location: loc,
		  temperature: (Object.prototype.toString.call(data.temp) === '[object Object]'? data.temp.day : data.temp),
		  precipitation: Math.round(pop * 100),
		  windSpeed: Math.round(data.wind_speed * 3.6),
		  windDegrees: data.wind_deg,
		  weatherDescription: data.weather[0].main,
		  date: (new Date(data.dt * 1000)).toLocaleDateString("en-GB")
		});
	  }
	  componentDidMount() {
		  this.setState({hasMounted: true});
	  }
	  componentDidUpdate() {
		  const { hasMounted } = this.state;
		  if (hasMounted) {
			document.body.style.backgroundImage = weatherBackground[this.state.weatherDescription].backgroundImage;
		  }
	  }
	  handleChange(e) {
		this.setState({
		  value: e.target.value,
		});
	  }
	  handleSubmit(e) {
		this.handleSearchLocation(e);
	  };
	  render() {
		  const { hasMounted } = this.state;
		  if (!hasMounted) {
			return <h1> Please wait </h1>
		  }
		return(
			<main>
				<NavBar currentLocation={this.state.location} handleInput={this.handleChange} handleSubmit={this.handleSubmit}> </NavBar>
				<Header currentLocation={this.state.location} handleForecastPeriodChange={this.handleForecastPeriodChange}></Header>
				<div className="widgetsContainer" style={styles.widgetsContainer}>
					<Link to="/temperature">
						<WeatherWidget className="widgetTemp" style={styles.widgetTemp} name="Temperature" value={this.state.temperature+"°C"}/>
					</Link>
					<Link to="/precipitation">
						<WeatherWidget className="widgetPrec" style={styles.widgetPrec} name="Precipitation" value={this.state.precipitation}/>
					</Link>
					<Link to="/wind">
						<WeatherWidget className="widgetWind" style={styles.widgetWind} name="Wind" value={this.state.windSpeed+" km/h"}/>
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