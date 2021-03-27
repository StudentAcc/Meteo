import React, {useState} from "react";
import Header from "./header";
import WeatherHeader from "./weatherHeader";
import WeatherChart from "./weatherChart";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { useEffect } from "react";

const WeatherWidgetMain = ({type, weatherData, location}) => {
	const [chartData, setChartData] = useState([]);
	const [hasMounted, setHasMounted] = useState(false);
	
	const formatDailyData = (tstart, tend) => {
		let chartData = [], y;
		for (var x=0, i=tstart; i<tend+2; x++, i++) {
			const dth =  (new Date(weatherData[0].hourly[i].dt * 1000)).getHours();
			if (type === "Temperature") 
				y = weatherData[0].hourly[i].temp;
			else if (type === "Precipitation") 
				y = weatherData[0].hourly[i].pop * 100;
			else if (type === "Wind") 
				y = Math.round(weatherData[0].hourly[i].wind_deg);
			chartData.push({x,y,dth});
		}
		setChartData(chartData);
	}
	const formatWeeklyData = () => {
		const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		let chartData = [], y;
		for (var x=0; x<weatherData[1].daily.length; x++) {
			const dth = weekDays[(new Date(weatherData[1].daily[x].dt * 1000)).getDay()];
			if (type === "Temperature") 
				y = weatherData[1].daily[x].temp.day;
			else if (type === "Precipitation") 
				y = weatherData[1].daily[x].pop * 100;
			else if (type === "Wind") 
				y = Math.round(weatherData[1].daily[x].wind_deg);
			chartData.push({x,y,dth});
		}
		setChartData(chartData);
	}
	const handleForecastChange = (e) => {
		e.preventDefault();
		const tstart = (new Date(weatherData[0].hourly[0].dt * 1000)).getHours();
		let tend = 24 - tstart;
		if (e.target.id === 'Today') 
		  formatDailyData(0, tend); 
		else if (e.target.id === 'Tomorrow') 
		  formatDailyData(tend, 24+tend); 	
		else
		  formatWeeklyData();
	}
	useEffect(() => {
		const tstart = (new Date(weatherData[0].hourly[0].dt * 1000)).getHours();
		let tend = 24 - tstart;
		console.log("Here");
		formatDailyData(0, tend);
		setHasMounted(true);
	}, [setHasMounted])	
	if (!hasMounted) 
		return <h1> Please wait </h1>
	return (
		<div>
			<FontAwesomeIcon style={styles.back} icon={faArrowLeft}/>
			<div style={styles.header}> 
				<Header currentLocation={location} handleForecastChange={handleForecastChange}/>
			</div>
			<WeatherHeader type={type} {...weatherData}/>
			<WeatherChart data={chartData} type={type}/>
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