import React from "react";
import {useMap, MapConsumer, MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from "leaflet";
// import Geocode from "react-geocode";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import Legend from "./Legend";
// import NavBar from './navBar';

let DefaultIcon = L.icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

//let image = require("./test.png");

class MapWidget extends React.Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		latitude: null,
	// 		longitude: null,
	// 		location: null,
	// 		current: null,
	// 		daily: null,
	// 		hourly: null,
	// 		hasFetched: false
	// 	};
	// 	this.props = this.fetchWeatherData();
	// }

	constructor(props) {
		super(props);
		this.state = {
			location: this.props.location,
			temperature: this.props.forecast.temp,
			precipitation: Math.round(this.props.hourly[0].pop * 100),
			windSpeed: Math.round(this.props.forecast.wind_speed * 3.6),
			windDegrees: this.props.forecast.wind_deg,
			weatherDescription: this.props.forecast.weather[0].main,
			date: (new Date(this.props.forecast.dt * 1000)).toLocaleDateString("en-GB"),
			daily: this.props.daily,
			hasMounted: false,
		};
		// this.props.fetchWeatherDataAux.bind(this.lat, this.lng)
		// this.fetchWeatherDataAux = this.fetchWeatherData.bind(this);
	}

	// updateWeatherData (lat,lng){
	// 	this.fetchWeatherData(lat,lng) ;
	// 	this.state = {
	// 		location: this.state.location,
	// 		temperature: this.state.forecast.temp,
	// 		precipitation: Math.round(this.state.hourly[0].pop * 100),
	// 		windSpeed: Math.round(this.state.forecast.wind_speed * 3.6),
	// 		windDegrees: this.state.forecast.wind_deg,
	// 		weatherDescription: this.state.forecast.weather[0].main,
	// 		date: (new Date(this.state.forecast.dt * 1000)).toLocaleDateString("en-GB"),
	// 		daily: this.state.daily,
	// 		hasMounted: false
	// 	};
	// }

	updateWeatherData (lat,lng){
		this.props.fetchWeatherDataAux("N/A",lat,lng)
		this.setState({
		location: this.props.location,
		temperature: this.props.forecast.temp,
		precipitation: Math.round(this.props.hourly[0].pop * 100),
		windSpeed: Math.round(this.props.forecast.wind_speed * 3.6),
		windDegrees: this.props.forecast.wind_deg,
		weatherDescription: this.props.forecast.weather[0].main,
		date: (new Date(this.props.forecast.dt * 1000)).toLocaleDateString("en-GB"),
		daily: this.props.daily
		});
		console.log("updated weather");
		this.mapPopup.update();
	}

	getCurrentTimestamp() {
		return Math.floor(Date.now()/1000);
	}

	updateMarker = (e) => {
		this.map.leafletElement.position.setLatLng(e.latlng)
		console.log("clicked")
	}

	baseLayerChange = event => {
		console.log('baseLayerChange event', event);
		var x = document.getElementsByClassName("leaflet-layer");
		var i;
		for (i = 0; i < x.length; i++) {
			// console.log(x[i].nextElementSibling.innerHTML);
			console.log(i);
			console.log(x[i].style.opacity);
		  	if (x[i].style.opacity === 1.1){
				x[i].style.zIndex = 10;
				// var map = withMyHook()
				// map.removeLayer(x[i].nextElementSibling.innerHTML.substring(1));
		  	} else {
				x[i].style.zIndex = 0;
			  }
		}

		// x[1].style.zIndex = "10";

		// var x = document.getElementsByClassName("leaflet-control-layers-selector");
		// var i;
		// for (i = 6; i < x.length; i++) {
		// 	// console.log(x[i].nextElementSibling.innerHTML);
		// 	console.log(event.name);
		//   	if (x[i].nextElementSibling.innerHTML.substring(1) != event.name){
		// 		console.log(x[i].nextElementSibling.innerHTML);
		// 		x[i].checked = false;
		// 		console.log(event.name)
		// 		// var map = withMyHook()
		// 		// map.removeLayer(x[i].nextElementSibling.innerHTML.substring(1));
		//   	}
		// }
		// // event.layer.remove();
	}
	
	whenReadyHandler = event => {
		const { target } = event;
		target.on('baselayerchange', this.baseLayerChange);
	}

	render() {
		const coords = [this.props.latitude, this.props.longitude]
		const key = "f6a4ad984d34e8c6e01aecdcce1a31c7";
		const imageStyle = {
			zIndex:'500' ,
			position: 'absolute',
			left: '0px',
			bottom: '0px'
		  };
		// const customMarker = L.icon({ iconUrl: require('/icon.jpg'), })
		return (
			<div style = {{height: '100vh'}}>
				{/* <NavBar></NavBar> */}
				<MapContainer
				style={{ width: '100%', height: '100%', zIndex:'0'  }}
				center={coords} 
				zoom={15} 
				scrollWheelZoom={true}
				// touchZoom={true}
				// whenCreated={(map: L.Map} => void};
				whenReady={this.whenReadyHandler}
				eventHandlers={{
					click: () => {
					console.log('marker clicked')
					},
				}}>
					<LayersControl position="topright" collapsed={true}>
						<LayersControl.BaseLayer checked name="Standard">
							<TileLayer
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Monochrome">
							<TileLayer
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
							/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Streets">
							<TileLayer
							attribution='&copy; <a href="www.google.com">Google Maps</a> contributors'
							url="http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
							/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Terrain">
							<TileLayer
							attribution='&copy; <a href="www.google.com">Google Maps</a> contributors'
							url="http://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
							/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Satelite">
							<TileLayer
							attribution='&copy; <a href="www.google.com">Google Maps</a> contributors'
							url="http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
							/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Hybrid">
							<TileLayer
							attribution='&copy; <a href="www.google.com">Google Maps</a> contributors'
							url="http://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
							/>
						</LayersControl.BaseLayer>
					</LayersControl>
					<LayersControl position="topright" collapsed={true}>
						<LayersControl.BaseLayer name="None" checked>
							<LayerGroup>
							</LayerGroup>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Temperature">
							<LayerGroup>
								<TileLayer 
								opacity = {1.1}
								attribution='<img src="Weather-Gradient-Charts/temperature.png" style="position: absolute; left: 0; bottom: 0; margin: 2vw calc(100% - 97vw); width: 25vw;"/>'
								url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
							</LayerGroup>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Precipitation">
							<LayerGroup>
								<TileLayer 
								opacity = {1.1}
								attribution='<img src="Weather-Gradient-Charts/precipitation.png" style="position: absolute; left: 0; bottom: 0; margin: 2vw calc(100% - 97vw); width: 25vw;"/>'
								url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
							</LayerGroup>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Clouds">
							<LayerGroup>
								<TileLayer 
								opacity = {1.1}
								attribution='<img src="Weather-Gradient-Charts/clouds.png" style="position: absolute; left: 0; bottom: 0; margin: 2vw calc(100% - 97vw); width: 25vw;"/>'
								url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
							</LayerGroup>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Wind speed">
							<LayerGroup>
								<TileLayer 
								// PLace holders
								opacity = {1.1}
								attribution='<img src="Weather-Gradient-Charts/wind-speed.png" style="position: absolute; left: 0; bottom: 0; margin: 2vw calc(100% - 97vw); width: 25vw;"/>'
								url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
							</LayerGroup>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Wind speed - with direction">
							<LayerGroup>
								<TileLayer 
								opacity = {1.1}
								attribution='<img src="Weather-Gradient-Charts/wind-speed.png" style="position: absolute; left: 0; bottom: 0; margin: 2vw calc(100% - 97vw); width: 25vw;"/>'
								url={`http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?date=${this.getCurrentTimestamp()}&appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
								{/* <img src="test.png" style="Legend.css"/> */}
							</LayerGroup>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Sea level pressure">
							<LayerGroup>
								<TileLayer
								opacity = {1.1}
								attribution='<img src="Weather-Gradient-Charts/pressure.png" style="position: absolute; left: 0; bottom: 0; margin: 2vw calc(100% - 97vw); width: 25vw;"/>'
								url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
							</LayerGroup>
						</LayersControl.BaseLayer>
					</LayersControl>
					<Marker ref={(ref) => { this.mapMarker = ref; }} position={coords} draggable = {true} eventHandlers={{
						dragend: (e) => {
							var coords = this.mapMarker.getLatLng();
							console.log('marker moved'+coords);
							this.setState ({
								lat: coords.lat,
								lng: coords.lng
							})
							// console.log(this.state.lat);
							// console.log(this.state.lng);
							// Geocode.setLocationType("ROOFTOP");
							// Geocode.setApiKey("AIzaSyAZOPHHp7iiz1Y9dAcsLxU86qSKvWEsWFk");
							// Geocode.fromLatLng(this.state.lat,this.state.lng).then((res) => {
							// 	address = res.results[0].formatted_address;
							// 	console.log(address);
							// 	this.props.handleSubmit(address);
							// }, (err) => {
							// 	console.log(err);
							// });
							this.updateWeatherData(this.state.lat, this.state.lng);
							//console.log(address);
							// var address = `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${key}`;
							// App.fetchWeatherData()
						}}}>
						<Popup ref={(ref) => { this.mapPopup = ref; }} >
							Temperature: { this.state.temperature+"°C"};
							<br/>
							Precipitation: {this.state.precipitation+" mm/h"};
							<br/>
							Wind speed: {this.state.windSpeed+" km/h"};
						</Popup>
					</Marker>
				</MapContainer>
			</div>
		)
	}
}

export default MapWidget;

