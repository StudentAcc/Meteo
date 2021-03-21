import './App.css';
import React from 'react';
import WeatherWidgetMain from "./weatherWidgetMain";
import Homepage from "./Homepage";
import Geocode from "react-geocode";
import MapWidget from "./MapWidget";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      location: null,
      current: null,
      daily: null,
      hourly: null,
      hasFetched: false
    }
    Geocode.setLocationType("ROOFTOP");
		Geocode.setApiKey("AIzaSyAZOPHHp7iiz1Y9dAcsLxU86qSKvWEsWFk");
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
            current: data.current,
            daily: data.daily,
            hourly: data.hourly,
            hasFetched: true});
			  }, (err) => {
				console.log(err);
			  });
			}, (err) => {
			  console.log(err); 
			});
		  });
		}
	}
  componentDidMount() {
    this.fetchWeatherData();
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
              <Homepage {...this.state}/>
              </Route>
            <Route exact path="/temperature">
              <WeatherWidgetMain {...this.state} category="Temperature"/>
            </Route>
            <Route exact path="/precipitation">
              <WeatherWidgetMain {...this.state} category="Precipitation"/>
            </Route>
            <Route exact path="/wind">
              <WeatherWidgetMain {...this.state} category="Wind"/>
            </Route>
            <Route exact path="/map">
            <MapWidget lat={this.state.latitude} lng={this.state.longitude}/>
            </Route>
            <Redirect from="*" to="/"/>
            </Switch>
        </Router>
    )
  }
}

export default App;
