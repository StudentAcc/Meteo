import React from 'react';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
  } from 'react-places-autocomplete';  

class SearchBar extends React.Component {
	// Used as suggested in react-places-autocomplete
	constructor(props) {
		super(props);
		this.state = { address: '' };
	  }
	
	  handleChange = address => {
		this.setState({ address });
	  };
	
	  handleSelect = address => {
		geocodeByAddress(address)
		  .then(results => {
			  getLatLng(results[0])
			  this.props.handleSubmit(address);
		  })
		  .then(latLng => console.log('Success', latLng))
		  .catch(error => console.error('Error', error));
	  };
	  render() {
		return (
		  <PlacesAutocomplete
			value={this.state.address}
			onChange={this.handleChange}
			onSelect={this.handleSelect}
		  >
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
			  <div style={styles.div}>
				<input
				  {...getInputProps({
					placeholder: '   Search Places ...',
					className: 'location-search-input',
				  })} style={styles.input}
				/>
				<div className="autocomplete-dropdown-container">
				  {loading && <div>Loading...</div>}
				  {suggestions.map(suggestion => {
					const className = suggestion.active
					  ? 'suggestion-item--active'
					  : 'suggestion-item';
					// inline style for demonstration purpose
					const style = suggestion.active
					  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
					  : { backgroundColor: '#ffffff', cursor: 'pointer' };
					return (
					  <div
						{...getSuggestionItemProps(suggestion, {
						  className,
						  style,
						})}
					  >
						<span>{suggestion.description}</span>
					  </div>
					);
				  })}
				</div>
			  </div>
			)}
		  </PlacesAutocomplete>
		);
	  }
	}
	

let styles = {
	div: {
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