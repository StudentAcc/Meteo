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
			data: this.props,
			chartData: [],
			hasMounted: false
		}
	}
	formatData(tstart, tend) {
		const {type} = this.state
		let chartData = []
		let y;
		for (var x=0, i=tstart; i<tend; x++, i++) {
			const dth =  (new Date(this.props[i].dt * 1000)).getHours();
			const day = (new Date(this.props[i].dt * 1000)).getDay();
			if (type === "Temperature") 
				y = this.props[i].temp;
			else if (type === "Precipitation") 
				y = this.props[i].pop * 100;
			else if (type === "Wind") 
				y = Math.round(this.props[i].wind_deg);
			chartData.push({x,y,dth});
		}
		this.setState({chartData: chartData});
	}
	handleForecastChange(e) {
		e.preventDefault();
		const tstart = (new Date(this.props[0].dt * 1000)).getHours();
		let tend = 24 - tstart;
		if (e.target.id === 'Today') {
		  this.formatData(0, tend); 
		} else if (e.target.id === 'Tomorrow') {
		  this.formatData(tend, 24+tend); 		
	  }
	}
	componentDidMount() {
		const tstart = (new Date(this.props[0].dt * 1000)).getHours();
		let tend = 24 - tstart;
		this.formatData(0, tend);
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