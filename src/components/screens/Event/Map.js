import React, { Component } from 'react';
import Axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import { Text } from 'native-base';

const { height } = Dimensions.get('screen');

class Map extends Component {
	render() {
		const { lat, lng } = this.props.location;
		return (
			<MapView
				style={styles.mapView}
				initialCamera={{
					center: {
						latitude: lat,
						longitude: lng
					},
					pitch: 0,
					heading: 0,
					altitude: 0,
					zoom: 18
				}}
			>
				<Marker key={1} coordinate={{ latitude: lat, longitude: lng }} />
			</MapView>
		);
	}
}

const styles = StyleSheet.create({
	mapView: {
		height: height * 0.5
	}
});

export default Map;
