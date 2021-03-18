import React from "react";
import Header from "./header";
import WeatherHeader from "./weatherHeader";
import WeatherChart from "./weatherChart";

class WeatherWidgetMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			wCategory: this.props.category,
			data: this.props,
			chartData: [],
			hasMounted: false
		}
	}
	formatData() {
		const hourly = this.state.data.hourly;
		const tstart = (new Date(hourly[0].dt * 1000)).getHours();
		const tend = 24 - tstart;
		const { chartData } = this.state
		const { wCategory } = this.state;
		let y;
		for (var x=0; x<tend+1; x++) {
			const dth =  (new Date(hourly[x].dt * 1000)).getHours();
			if (wCategory === "Temperature") 
				y = hourly[x].temp;
			else if (wCategory === "Precipitation") 
				y = hourly[x].pop * 100;
			else if (wCategory === "Wind") 
				y = Math.round(hourly[x].wind_speed * 3.6);
			chartData.push({x,y,dth});
		}
	}
	componentDidMount() {
		this.formatData();
		this.setState({hasMounted: true});
	}
	render() {
		const {hasMounted} = this.state;
		if (!hasMounted) {
			return <h1> Please wait </h1>
		}
		return (
			<div>
				<Header currentLocation={this.props.location}/>
				<WeatherHeader wCategory={this.state.wCategory} {...this.state.data}/>
				<WeatherChart data={this.state.chartData} type={this.state.wCategory}/>
			</div>
		);
	}
}

export default WeatherWidgetMain;