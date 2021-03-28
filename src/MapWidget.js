import React from "react";
import {MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import NavBar from './navBar';

// Marker icon reset
let DefaultIcon = L.icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;


class MapWidget extends React.Component {

	// Constructor
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
			map: null
		};
	}

	// Updates marker and popup info
	updateWeatherData = (address,lat,lng) => {
		var newLatLng = new L.LatLng(lat, lng);
		this.mapMarker.setLatLng(newLatLng);
		const {map} = this.state;
		map.flyTo(newLatLng);
		this.props.fetchWeatherData("N/A",lat,lng);
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

	// Gets current timestamp
	getCurrentTimestamp() {
		return Math.floor(Date.now()/1000);
	}

	// Chnages zIndex of overlay to go above base layer
	baseLayerChange = event => {
		console.log('baseLayerChange event', event);
		var x = document.getElementsByClassName("leaflet-layer");
		var i;
		for (i = 0; i < x.length; i++) {
			console.log(i);
			console.log(x[i].style.opacity);
			console.log(x);
		  	if (x[i].style.opacity == 1.1){
				x[i].style.zIndex = 100;
		  	} else {
				x[i].style.zIndex = 0;
			}
		}
		return
	}
	
	// Map ready event handler
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
		return (
			<div style = {{height: '100vh',   display: "flex", flexFlow: "column"}}>
				<NavBar currentLocation={this.state.location} handleSubmit={this.updateWeatherData}/>
				<MapContainer
				style={{ width: '100%', flexGrow:'1', zIndex:'0'  }}
				center={coords} 
				zoom={15} 
				scrollWheelZoom={true}
				whenReady={this.whenReadyHandler}
				whenCreated={map => this.setState({ map })}
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
							<LayerGroup
							opacity = {1.1}>
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
						// Marker end of movement event handler
						moveend: (e) => {
							var coords = this.mapMarker.getLatLng();
							console.log('marker moved'+coords);
							this.setState ({
								lat: coords.lat,
								lng: coords.lng
							})
							this.mapMarker.update()
							this.updateWeatherData("N/A", this.state.lat, this.state.lng);
							this.mapMarker.update()
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

