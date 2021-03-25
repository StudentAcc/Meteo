import React from "react";
import {useMap, MapConsumer, MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from "leaflet";

function withMyHook() {
  return function WrappedComponent(props) {
    const myHookValue = useMap();
    return myHookValue
  }
}

class MyComponent extends React.Component {
  render(){
    const myHookValue = this.props.myHookValue;
    return <div>{myHookValue}</div>;
  }
}

export {withMyHook};