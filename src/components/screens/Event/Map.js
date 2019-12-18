import React, { Component } from 'react';
import Axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import { Text } from 'native-base';

const { height } = Dimensions.get('screen');

class Map extends Component {
	state = {
		lat: 0.0,
		lng: 0.0
	};

	componentDidMount = () => {
		Axios.get(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
				`${this.props.location}, santo domingo`
			)}&key=AIzaSyCyw0xtlbcJiaRUDB3bNWbkcW2IJWprrbc`
		).then((data) => {
			this.setState({
				...this.state,
				lat: data.data.results[0].geometry.location.lat,
				lng: data.data.results[0].geometry.location.lng
			});
		});
	};

	render() {
		if (this.state.lng == 0.0 && this.state.lat == 0.0) return <Text>Cargando</Text>;
		return (
			<MapView
				style={styles.mapView}
				initialCamera={{
					center: {
						latitude: this.state.lat,
						longitude: this.state.lng
					},
					pitch: 0,
					heading: 0,
					altitude: 0,
					zoom: 18
				}}
			>
				<Marker key={1} coordinate={{ latitude: this.state.lat, longitude: this.state.lng }} />
			</MapView>
		);
	}
}

const styles = StyleSheet.create({
	mapView: {
		height: height * 0.3
	}
});

export default Map;
