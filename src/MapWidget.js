import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


class MapWidget extends React.Component {
	render() {
		const coords = [this.props.lat, this.props.lng]
		const key = "3a272e399eccb14fac2be5eeca1b5d00";
		return (
			<MapContainer style={{ width: '100%', height: '1000px' }} center={coords} zoom={20} scrollWheelZoom={false}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
				{/* <TileLayer url={`https://tile.openweathermap.org/map/clouds_new/13/${coords[0]}/${coords[1]}.png?appid=${key}`}/>
				<TileLayer url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${key}`}/>
				<TileLayer url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${key}`}/> */}
				<Marker position={coords}>
					<Popup>
					<span>A pretty CSS3 popup. <br/> Easily customizable.</span>
					</Popup>
				</Marker>
			</MapContainer>	
		)
	}
}

export default MapWidget;