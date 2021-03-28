import React, {useState} from "react";
import Header from "./header";
import WeatherHeader from "./weatherHeader";
import WeatherChart from "./weatherChart";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { useEffect } from "react";
import {useHistory} from "react-router-dom";

const WeatherWidgetMain = ({type, weatherData, location}) => {
	const [chartData, setChartData] = useState([]);
	const [hasMounted, setHasMounted] = useState(false);
	const [period, setPeriod] = useState("Hourly");	
	const history = useHistory();

	const getVarName = (obj) => Object.keys(obj)[0];

	const formatData = (lo, hi, data, period) => {
		const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		let chartData = [], y, dth;
		for (var x=0, i=lo; i<hi; i++, x++) {
			if (period === "hourly")
				dth = (new Date(data[i].dt * 1000)).getHours();
			else 
				dth = weekDays[(new Date(data[i].dt * 1000)).getDay()];
			if (type === "Temperature") 
				if (data[i].temp.constructor === Object) 
					y = data[i].temp.day;
				else 
					y = data[i].temp
			else if (type === "Precipitation") 
				y = data[i].pop * 100;
			else if (type === "Wind") 
				y = Math.round(data[i].wind_deg);
			chartData.push({x,y,dth});
		}
		setChartData(chartData);
	}

	const handleForecastChange = (e) => {
		e.preventDefault();
		const hourly = weatherData[0].hourly, daily = weatherData[1].daily;
		const tstart = (new Date(hourly[0].dt * 1000)).getHours();
		const tend = 24 - tstart;
		if (e.target.id === "Today") {
			formatData(0, tend+1, hourly, getVarName({hourly}));
			setPeriod("Hourly");
		} else if (e.target.id === "Tomorrow") {
			formatData(tend, 24+tend+1, hourly, getVarName({hourly}))
			setPeriod("Hourly");
		} else {
			const dend = weatherData[1].daily.length;
			formatData(0, dend, daily, getVarName({daily}));
			setPeriod("Daily");
		}
	}
	useEffect(() => {
		const tstart = (new Date(weatherData[0].hourly[0].dt * 1000)).getHours();
		let tend = 24 - tstart;
		const hourly = weatherData[0].hourly;
		formatData(0, tend+1, hourly, getVarName({hourly}));
		setPeriod("Hourly");
		setHasMounted(true);
	}, [setHasMounted])	
	if (!hasMounted) 
		return <h1> Please wait </h1>
	return (
		<div>
			<FontAwesomeIcon onClick={() => history.goBack()} style={styles.back} icon={faArrowLeft}/>
			<div style={styles.header}> 
				<Header weekly={true} currentLocation={location} handleForecastChange={handleForecastChange}/>
			</div>
			<WeatherHeader type={type} {...weatherData}/>
			<WeatherChart data={chartData} type={type} period={period === "Hourly" ? "Hourly" : "Daily"}/>
		</div>
	);
}

let styles = {
	back: {
		fontSize: "20px",
		position: "absolute",
		paddingLeft: "10px",
		color: "white"
	},
	header: {
		paddingLeft: "15px",
	}
}

export default WeatherWidgetMain;