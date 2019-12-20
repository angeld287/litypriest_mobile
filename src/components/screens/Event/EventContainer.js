import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Event from './Event';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from '../../../amplify/queries';

class EventContainer extends Component {
	state = {
		event: {},
		loading: true,
		error: false
	};

	componentDidMount = async () => {
		try {
			const event = await API.graphql(
				graphqlOperation(listEvents, {
					id: 'd6dc2b93-7a22-4f2f-91cd-a8d3dc8e0538'
				})
			);
			this.setState({
				loading: false,
				event: event.data.listEvents.items[0]
			});
		} catch (error) {
			this.setState({
				loading: false,
				error: true
			});
		}
	};

	render() {
		if (this.state.loading) return <Text>Cargando...</Text>;

		return <Event event={this.state.event} />;
	}
}

export default EventContainer;
