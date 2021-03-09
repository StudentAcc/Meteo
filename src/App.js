import './App.css';
import React from 'react';
import NavBar from './navBar';
import WeatherWidget from './weatherWidget';
import weatherBackground from './weatherDescriptions';
import Header from './header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      latitude: null,
      longitutde: null,
      location: null,
      temperature: null,
      precipitation: null, 
      windSpeed: null,
      windDegrees: null,
      weatherDescription: null,
      period: 'Today'
    };
  }
  fetchWeatherData() {
    let component = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        const key = "3a272e399eccb14fac2be5eeca1b5d00";
        const weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
        fetch(weatherURL).then(res => res.json())
        .then((data) => {
          console.log(data);
          component.setState({
            mounted: true,
            latitude: lat,
            longitude: lon,
            location: data.name,
            temperature: data.main.temp,
            precipitation: '10',
            windSpeed: data.wind.speed,
            windDegrees: data.wind.deg,
            weatherDescription: data.weather[0].description
          });
          if (Object.prototype.hasOwnProperty(data, "rain"))
            component.setState({precipitation: data.rain});
        });
      });
    }
  }
  componentDidMount() {
    this.fetchWeatherData();
  }
  componentDidUpdate() {
    document.body.style.backgroundImage = weatherBackground[this.state.weatherDescription].backgroundImage;
  }
  render() {
    return (
          <main>
          <NavBar currentLocation="London"> </NavBar>
          <Header currentLocation="London"></Header>
          <div style={styles.widgetsContainer}>
            <WeatherWidget style={styles.widgetTemp} name="Temperature" value={this.state.temperature+"°c"}/>
            <WeatherWidget style={styles.widgetPrec} name="Precipitation" value={this.state.precipitation}/>
            <WeatherWidget style={styles.widgetWind} name="Wind" value={this.state.windSpeed+" km/h"}/>
          </div>
          </main>
    )
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

export default App;
