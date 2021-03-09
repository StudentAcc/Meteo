import React from 'react';

class SearchBar extends React.Component {
	render() {
		return (
			<div style={styles.div}>
				<input style={styles.input} type="text" placeholder="Search Location"
				       onChange={this.props.change}></input>
			</div>
		)
	}
}

let styles = {
	div: {
		width: '100%',
		display: 'inline-block',
		position: 'absolute',
		top: '30px',
		right: '30px'
	},
	input: {
		border: 'none',
		float: 'right',
		borderRadius: '5px',
		padding: '10px 0px 10px 0px',
		outline: 'none'
	}
}

export default SearchBar