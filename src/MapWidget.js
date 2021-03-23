import React from "react";
import {useMapEvents, MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from "leaflet";
// import Geocode from "react-geocode";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import Legend from "./Legend";
// import {fetchWeatherData} from "./App";
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
	
	// baseLayerChange = event => {
	// 	console.log('baseLayerChange event', event);
	// }
	
	// whenReadyHandler = event => {
	// 	const { target } = event;
	// 	target.on('baselayerchange', this.baseLayerChange);
	// }

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
				// whenReady={this.whenReadyHandler}
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
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name="Streets">
							<TileLayer
							attribution='&copy; <a href="www.google.com">Google Maps</a> contributors'
							url="http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
							/>
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
								<TileLayer 
								attribution='<img src="logo192.png" style="position: absolute; left: 0; bottom: 0; margin: 3vw calc(100% - 97vw);"/>'
								url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
							</LayerGroup>
						</LayersControl.Overlay>
						<LayersControl.Overlay name="Wind speed - with direction">
							<LayerGroup>
								<TileLayer 
								attribution='<img src="test.png" style="position: absolute; left: 0; bottom: 0; margin: 3vw calc(100% - 97vw);"/>'
								url={`http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?date=${this.getCurrentTimestamp()}&appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
								{/* <img src="test.png" style="Legend.css"/> */}
							</LayerGroup>
						</LayersControl.Overlay>
						<LayersControl.Overlay name="Sea level pressure">
							<LayerGroup>
								<TileLayer
								attribution='<div id="mydiv" style="position: absolute; left: 0; bottom: 0; margin: 3vw calc(100% - 97vw); z-index: 9; background-color: #f1f1f1; text-align: center; border: 1px solid #d3d3d3;"><div id="mydivheader" style = "padding: 10px; cursor: move; z-index: 10; background-color: #2196F3; color: #fff;">Click here to move</div><img src="logo192.png" style="position: absolute; left: 0; bottom: 0; margin: 3vw calc(100% - 97vw);"/><script> dragElement(document.getElementById("mydiv"));                function dragElement(elmnt) {          var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;          if (document.getElementById(elmnt.id + "header")) { document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;          } else {elmnt.onmousedown = dragMouseDown;          }                  function dragMouseDown(e) {            e = e || window.event;            e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY; document.onmouseup = closeDragElement; document.onmousemove = elementDrag;          }                  function elementDrag(e) {            e = e || window.event;            e.preventDefault();  pos1 = pos3 - e.clientX;            pos2 = pos4 - e.clientY;            pos3 = e.clientX;            pos4 = e.clientY;   elmnt.style.top = (elmnt.offsetTop - pos2) + "px";            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";          }                  function closeDragElement() {   document.onmouseup = null;            document.onmousemove = null;          }        }        </script></div>'
								url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=f6a4ad984d34e8c6e01aecdcce1a31c7`}/>
							</LayerGroup>
						</LayersControl.Overlay>
					</LayersControl>
					<Marker ref={(ref) => { this.mapMarker = ref; }} position={coords} draggable = {true} eventHandlers={{
    					dragend: (e) => {
							this.temp = this.mapMarker.getLatLng();
      						console.log('marker moved'+this.mapMarker.getLatLng())
							this.lat = this.temp[0]
							this.lng = this.temp[1]
							// fetchWeatherData()
    					}}}>
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