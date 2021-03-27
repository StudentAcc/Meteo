import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './weatherWidget.css';
import "./weather_icons/css/weather-icons.css";
import "./weather_icons/css/weather-icons-wind.css";

const WeatherWidget = ({name, value, style}) => {
	const renderWidgetType = () => {
		if (name === 'Precipitation') 
			return <CircularProgressbar styles={_styles.meter} value={value} text={`${value}%`}/>
		else if (name === "Temperature")
			return <p className="pvalue"> {value} <i className="wi wi-celsius"></i></p>
		return <p className="pvalue"> {value} </p>

	}
	return (
		<div className="container" style={style.container}>
			<div className="widget">
				<div className="data">
					{renderWidgetType()}
					<p className={name}> {name}</p>
				</div>
			</div>
		</div>
	);
}

let _styles = {
	meter: {
		root: {
			position: 'relative',
			width: '50%',
			height: '50%',
			paddingTop: '25%',
			float: 'center',
		},
		path: {
			stroke: '#ffffff'
		},
		trail: {
			stroke: '#a3b4bd',
			strokeLinecap: 'butt',
			transform: 'rotate(0.25turn)',
			transformOrigin: 'center center',
		},
		text: {
			fill: '#ffffff',
			fontSize: '16px',
		},
		background: {
			fill: '#ffffff'
		  }
	}
}
export default WeatherWidget;