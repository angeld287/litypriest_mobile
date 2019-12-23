import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import Event from './Event';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent } from '../../../amplify/queries';
import { deleteEvent } from '../../../amplify/mutations';
import Axios from 'axios';

class EventContainer extends Component {
	state = {
		event: {},
		loading: true,
		error: false
	};

	fetchEvent = async () => {
		try {
			//console.log(this.props.navigation.state.params.id);
			const event = await API.graphql(
				graphqlOperation(getEvent, {
					id: this.props.navigation.state.params.id
				})
			);
			console.log(event);
			const locationData = await Axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
					`${event.data.getEvent.location.items[0].location.name}, santo domingo`
				)}&key=AIzaSyCyw0xtlbcJiaRUDB3bNWbkcW2IJWprrbc`
			);
			console.log(locationData);
			// .then((data) => {
			// 	this.setState({
			// 		...this.state,
			// 		lat: data.data.results[0].geometry.location.lat,
			// 		lng: data.data.results[0].geometry.location.lng
			// 	});
			// });

			this.setState({
				loading: false,
				event: {
					...event.data.getEvent,
					location: {
						name: event.data.getEvent.location.items[0].location.name,
						location: {
							lat: locationData.data.results[0].geometry.location.lat,
							lng: locationData.data.results[0].geometry.location.lng
						}
					}
				}
			});
		} catch (error) {
			this.setState({
				loading: false,
				error: true
			});
		}
	};

	componentDidMount = () => {
		this.fetchEvent();
	};

	deleteEvent = async () => {
		await API.graphql(graphqlOperation(deleteEvent, { input: { id: this.state.event.id } }));
		this.props.navigation.push('Home');
	};

	handleDelete = () => {
		console.log('Pressed borrar');
		Alert.alert('Esta seguro?', 'El evento eliminado no se puede recuperar', [
			{
				text: 'Si',
				onPress: () => this.deleteEvent()
			},
			{
				text: 'Cancelar',
				style: 'cancel'
			}
		]);
		//
	};

	handleEdit = () => {
		this.props.navigation.navigate('EditEvent', { id: this.state.event.id });
	};

	floattingButtonData = {
		fabIcon: 'md-add',
		actions: [
			{
				icon: 'md-close',
				label: 'Borrar',
				onPress: this.handleDelete
			},
			{
				icon: 'md-create',
				label: 'Editar',
				onPress: this.handleEdit
			}
		]
	};

	render() {
		if (this.state.loading) return <Text>Cargando...</Text>;
		if (this.state.error) return <Text>Error</Text>;
		return <Event event={this.state.event} fab={this.floattingButtonData} />;
	}
}

export default EventContainer;
