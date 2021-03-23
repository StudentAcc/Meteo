import './App.css';
import React from 'react';
import WeatherWidgetMain from "./weatherWidgetMain";
import Homepage from "./Homepage";
import Geocode from "react-geocode";
import MapWidget from "./MapWidget";
import weatherBackground from './weatherDescriptions';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      latitude: null,
      longitude: null,
      location: '',
      forecast: {},
      daily: [],
      hourly: [],
      hasFetched: false
    }
    Geocode.setLocationType("ROOFTOP");
		Geocode.setApiKey("AIzaSyAZOPHHp7iiz1Y9dAcsLxU86qSKvWEsWFk");
    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleForecastChange = this.handleForecastChange.bind(this);
  }
  fetchWeatherData() {
		if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition((position) => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			const key = "3a272e399eccb14fac2be5eeca1b5d00";
			const forecast = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${key}&units=metric`
			fetch(forecast).then(res => res.json())
			.then((data) => {
			  console.log(data);
			  Geocode.fromLatLng(lat, lon).then((res) => {
          const loc = res.results[0].address_components[2].long_name;
          this.setState({
            latitude: lat,
            longitude: lon,
            location: loc,
            forecast: data.hourly[0],
            daily: data.daily,
            hourly: data.hourly,
            hasFetched: true
          });
			  }, (err) => {
				console.log(err);
			  });
			}, (err) => {
			  console.log(err); 
			});
		  });
		}
	}
  handleChange(e) {
		this.setState({
		  value: e.target.value,
		});
	}
  handleSubmit(e) {
		e.preventDefault();
		const location = this.state.value; 
		Geocode.fromAddress(location).then((res) => {
		  const {lat, lng} = res.results[0].geometry.location;
		  const key = "3a272e399eccb14fac2be5eeca1b5d00";
		  const forecast = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&appid=${key}&units=metric`
		  fetch(forecast).then(res => res.json())
		  .then((data) => {
			console.log(data);
			this.setState({
          latitude: lat,
          longitude: lng,
          location: location,
          forecast: data.hourly[0],
          daily: data.daily,
          hourly: data.hourly
        });
		  }, (err) => {
			console.log(err); 
		  });
		}, (err) => {
		  console.log(err);
	   });
	  }
    handleForecastChange(e) {
      e.preventDefault();
      if (e.target.id === 'Today') {
        this.setState({
         forecast: this.state.hourly[0]
        }); 
      } else if (e.target.id === 'Tomorrow') {
        this.setState({
          forecast: this.state.hourly[24]
      });
    }
  }
  componentDidMount() {
    this.fetchWeatherData();
  }
  componentDidUpdate() {
    const { hasFetched } = this.state;
    if (hasFetched) {
      document.body.style.backgroundImage = weatherBackground[this.state.forecast.weather[0].main].backgroundImage;
    }
  }
  render() {
    const { hasFetched } = this.state;
    if (!hasFetched) {
      return <h1> Please wait </h1>
    }
    return (
        <Router>
          <Switch>
            <Route exact path="/">
              <Homepage {...this.state.forecast} 
               location={this.state.location} 
               handleSubmit={this.handleSubmit}
               handleChange={this.handleChange}
               handleForecastChange={this.handleForecastChange}/>
              </Route>
            <Route exact path="/temperature">
              <WeatherWidgetMain {...this.state.hourly} 
               location={this.state.location} 
               handleSubmit={this.handleSubmit}
               handleChange={this.handleChange}
               type="Temperature"/>
            </Route>
            <Route exact path="/precipitation">
              <WeatherWidgetMain {...this.state.hourly} 
               location={this.state.location} 
               handleSubmit={this.handleSubmit}
               handleChange={this.handleChange}
               type="Precipitation"/>
            </Route>
            <Route exact path="/wind">
              <WeatherWidgetMain {...this.state.hourly} 
               location={this.state.location} 
               handleSubmit={this.handleSubmit}
               handleChange={this.handleChange}
               type="Wind"/>
            </Route>
            <Route exact path="/map">
            <MapWidget {...this.state}/>
            </Route>
            <Redirect from="*" to="/"/>
            </Switch>
        </Router>
    )
  }
}

export default App;
