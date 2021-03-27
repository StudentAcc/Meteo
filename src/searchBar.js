import React, {useState} from 'react';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
  } from 'react-places-autocomplete';  

import {useMediaQuery} from "react-responsive"

const SearchBar = ({handleSubmit}) => {
	// Adapted from react-places-autocomplete
	const [address, setAddress] = useState('');

	const isDesktop = useMediaQuery({query: '(min-width: 1224px)'})
	const isTabletOrMobile = useMediaQuery({query: '(max-width: 1223px)'})
	
	const handleChange = (address) => {
		setAddress(address);
	};
	
	const handleSelect = (address) => {
		geocodeByAddress(address)
		  .then(results => {
			  getLatLng(results[0])
			  .then(({ lat, lng }) => {
			  	console.log(lat,lng);
				handleSubmit(address,lat,lng);
			  });
		  })
		  .then(latLng => console.log('Success', latLng))
		  .catch(error => console.error('Error', error));
	  };
	let styles = {
		input: {
			border: 'none',
			float: 'right',
			borderRadius: '5px',
			padding: '10px 0px 10px 0px',
			outline: 'none',
			zIndex: "10000"
		}
	}
	if (isDesktop) {
		styles.div = {
				display: 'inline-block',
				position: 'absolute',
				top: '30px',
				right: '30px',
				zIndex: "10000"
		}
	} else if (isTabletOrMobile) {
		styles.div = {
			width: "85%",
			display: 'inline-block',
			position: 'absolute',
			top: '0px',
			right: '10px',
			zIndex: "10000"
		}
		styles.input.width = "100%"
	}
		return (
		  <PlacesAutocomplete
			value={address}
			onChange={handleChange}
			onSelect={handleSelect}
			style = {{zIndex: 10000}}
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

export default SearchBar