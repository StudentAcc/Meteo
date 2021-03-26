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
      latitude: undefined,
      longitude: undefined,
      location: '',
      forecast: {},
      daily: [],
      hourly: [],
      hasFetched: false
    }
    Geocode.setLocationType("ROOFTOP");
		Geocode.setApiKey("AIzaSyAZOPHHp7iiz1Y9dAcsLxU86qSKvWEsWFk");
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleForecastChange = this.handleForecastChange.bind(this);
  }

 fetchWeatherData(loc, lat, lng) {
			const key = "3a272e399eccb14fac2be5eeca1b5d00";
			const forecast = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&appid=${key}&units=metric`
			fetch(forecast).then(res => res.json())
			.then((data) => {
			  console.log(data);
			  Geocode.fromLatLng(lat, lng).then((res) => {
          const loc = res.results[0].address_components[2].long_name;
          this.setState({
            latitude: lat,
            longitude: lng,
            location: loc,
            forecast: data.hourly[0],
            daily: data.daily,
            hourly: data.hourly,
            hasFetched: true
            });
			    })
          .catch(err => console.error(err))
  		})
    .catch(err => console.error(err))
  }

  handleSubmit(address) {
		Geocode.fromAddress(address).then((res) => {
		  const {lat, lng} = res.results[0].geometry.location;
      this.fetchWeatherData(address, lat, lng);
    }) 
   .catch(err => console.log(err));
  }
  
  handleForecastChange(e) {
    e.preventDefault();
      if (e.target.id === 'Today') 
        this.setState({forecast: this.state.hourly[0]}); 
      else if (e.target.id === 'Tomorrow') 
        this.setState({forecast: this.state.hourly[24]});
  }

  componentDidMount() {
    if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords;
        Geocode.fromLatLng(latitude, longitude).then((res) => {
          const location = res.results[0].address_components[2].long_name;
          this.fetchWeatherData(location, latitude, longitude);
        }).catch(err => console.log(err));
      });
    }
  }

  componentDidUpdate() {
    const { hasFetched } = this.state;
    if (hasFetched) 
      document.body.style.backgroundImage = weatherBackground[this.state.forecast.weather[0].main].backgroundImage;
  }

  render() {
    const { hasFetched } = this.state;
    if (!hasFetched) 
      return <h1> Please wait </h1>
    const data = [{hourly: this.state.hourly},{daily:this.state.daily}]
    return (
        <Router>
          <Switch>
            <Route exact path="/">
              <Homepage {...this.state.forecast} 
               location={this.state.location} 
               handleSubmit={this.handleSubmit}
               handleForecastChange={this.handleForecastChange}/>
              </Route>
            <Route exact path="/temperature">
              <WeatherWidgetMain weatherData={data} 
               location={this.state.location} 
               type="Temperature"/>
            </Route>
            <Route exact path="/precipitation">
              <WeatherWidgetMain weatherData={data}
               location={this.state.location} 
               type="Precipitation"/>
            </Route>
            <Route exact path="/wind">
              <WeatherWidgetMain weatherData={data}
               location={this.state.location} 
               type="Wind"/>
            </Route>
            <Route exact path="/map">
            <MapWidget {...this.state} fetchWeatherDataAux={this.fetchWeatherDataAux}/>
            </Route>
            <Redirect from="*" to="/"/>
            </Switch>
        </Router>
    )
  }
}

export default App;
