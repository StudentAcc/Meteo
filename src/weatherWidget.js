import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './weatherWidget.css';

class WeatherWidget extends React.Component {
	renderWidgetType() {
		if (this.props.name === 'Precipitation') 
			return <CircularProgressbar styles={styles.meter} value={this.props.value} text={`${this.props.value}%`}/>
		return <p className="pvalue"> {this.props.value} </p>
	}
	render() {
		return (
			<div className="container" style={this.props.style.container}>
				<div className="widget">
					<div className="data">
						{this.renderWidgetType()}
						<p className={this.props.name}> {this.props.name}</p>
					</div>
				</div>
			</div>
		);
	}
}

let styles = {
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