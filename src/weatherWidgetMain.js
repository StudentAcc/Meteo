import React from "react";
import Header from "./header";
import WeatherHeader from "./weatherHeader";
import WeatherChart from "./weatherChart";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

class WeatherWidgetMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: this.props.type,
			data: this.props.weatherData,
			chartData: [],
			hasMounted: false
		}
	}
	formatDailyData(tstart, tend) {
		const {type} = this.state
		const {weatherData} = this.props;
		let chartData = []
		let y;
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
		this.setState({chartData: chartData});
	}
	formatWeeklyData() {
		const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const {type} = this.state;
		const {weatherData} = this.props;
		let chartData = []
		let y;
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
		this.setState({chartData: chartData});
	}
	handleForecastChange(e) {
		e.preventDefault();
		const tstart = (new Date(this.props.weatherData[0].hourly[0].dt * 1000)).getHours();
		let tend = 24 - tstart;
		if (e.target.id === 'Today') 
		  this.formatDailyData(0, tend); 
		else if (e.target.id === 'Tomorrow') 
		  this.formatDailyData(tend, 24+tend); 	
		else
		  this.formatWeeklyData();
	}
	componentDidMount() {
		const tstart = (new Date(this.props.weatherData[0].hourly[0].dt * 1000)).getHours();
		let tend = 24 - tstart;
		this.formatDailyData(0, tend);
		this.setState({hasMounted: true});
	}
	render() {
		const {hasMounted} = this.state;
		if (!hasMounted) 
			return <h1> Please wait </h1>
		return (
			<div>
				<FontAwesomeIcon style={styles.back} icon={faArrowLeft}/>
				<div style={styles.header}> 
					<Header currentLocation={this.props.location} handleForecastChange={this.handleForecastChange.bind(this)}/>
				</div>
				<WeatherHeader type={this.state.type} {...this.state.data}/>
				<WeatherChart data={this.state.chartData} type={this.state.type}/>
			</div>
		);
	}
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