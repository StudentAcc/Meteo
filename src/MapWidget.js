import React from "react";
import {useMapEvents, MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup} from 'react-leaflet'
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

		let image = require("./test.png");

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

	// fetchWeatherData (){
	// 	const key = "3a272e399eccb14fac2be5eeca1b5d00";
	// 	const forecast = `http://api.openweathermap.org/data/2.5/onecall?lat=${this.props.lat}&lon=${this.props.lng}&exclude=minutely&appid=${key}&units=metric`
	// 	fetch(forecast).then(res => res.json())
	// 	.then((data) => {
	// 		console.log(data);
	// 		Geocode.fromLatLng(this.props.lat, this.props.lng).then((res) => {
	// 			const loc = res.results[0].address_components[2].long_name;
	// 			this.setState({
	// 				latitude: this.props.lat,
	// 				longitude: this.props.lng,
	// 				location: loc,
	// 				current: data.current,
	// 				daily: data.daily,
	// 				hourly: data.hourly,
	// 				hasFetched: true});
	// 	  		}, (err) => {
	// 			console.log(err);
	// 		});
	// 	});
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
			hasMounted: false
		};
	}

	getCurrentTimestamp() {
		return Math.floor(Date.now()/1000);
	}

	updateMarker = (e) => {
		this.map.leafletElement.position.setLatLng(e.latlng)
		console.log("clicked")
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
				eventHandlers={{
					click: () => {
					console.log('marker clicked')
					},
				}}>
					<LayersControl position="topright">
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
						<LayersControl.BaseLayer name="Satelite">
							<TileLayer
							attribution='&copy; <a href="www.google.com">Google Maps</a> contributors'
							url="http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
							/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Terrain">
							<TileLayer
							attribution='&copy; <a href="www.google.com">Google Maps</a> contributors'
							url="http://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
							/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Hybrid">
							<TileLayer
							attribution='&copy; <a href="www.google.com">Google Maps</a> contributors'
							url="http://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
							/>
						<LayersControl.BaseLayer name="Streets">
							<TileLayer
							attribution='&copy; <a href="www.google.com">Google Maps</a> contributors'
							url="http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
							/>
						</LayersControl.BaseLayer>
						</LayersControl.BaseLayer>
						<LayersControl.Overlay name="Temperature">
							<LayerGroup>
								<TileLayer url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
							</LayerGroup>
						</LayersControl.Overlay>
						<LayersControl.Overlay name="Precipitation">
							<LayerGroup>
								<TileLayer url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
							</LayerGroup>
						</LayersControl.Overlay>
						<LayersControl.Overlay name="Clouds">
							<LayerGroup>
								<TileLayer url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
							</LayerGroup>
						</LayersControl.Overlay>
						<LayersControl.Overlay name="Wind speed">
							<LayerGroup>
								<TileLayer url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
							</LayerGroup>
						</LayersControl.Overlay>
						<LayersControl.Overlay name="Wind speed - with direction">
							<LayerGroup>
								<TileLayer 
								// attribution='<img src="https://i.stack.imgur.com/2Ty62.png" style="position: absolute; left: 0px; bottom: 0px;")/>'
								url={`http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?date=${this.getCurrentTimestamp()}&appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
								{/* <Legend></Legend> */}
							</LayerGroup>
						</LayersControl.Overlay>
						<LayersControl.Overlay name="Sea level pressure">
							<LayerGroup>
								<TileLayer url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
							</LayerGroup>
						</LayersControl.Overlay>
					</LayersControl>
					<Marker ref={(ref) => { this.mapMarker = ref; }} position={coords}>
						<Popup>					
						Temperature: {this.state.temperature+"°C"}
						<br/>
						Precipitation: {this.state.precipitation}
						<br/>
						Wind speed: {this.state.windSpeed+" km/h"}
						<br/>
						TO DO: add units for precip.
						</Popup>
					</Marker>
				</MapContainer>
			</div>
		)
	}
}

export default MapWidget;