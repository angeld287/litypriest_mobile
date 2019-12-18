import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Event from './Event';

class EventContainer extends Component {
	state = {
		event: {}
	};

	componentDidMount = () => {
		setTimeout(() => {
			this.setState({
				event: {
					id: 'd6dc2b93-7a22-4f2f-91cd-a8d3dc8e0538',
					name: 'bautizo de niños',
					category: {
						id: 'd6adacf2-9f23-4fc8-ac9c-8d4061a0bb4f',
						name: 'Eucaristia',
						description: 'celebracion de la eucaristia'
					},
					date: '28/7/2020',
					description: 'Se realizara el bautizo de varios bebes',
					location: {
						id: '5008eb01-87f2-437a-a580-fae8ed7961d4',
						name: 'Parroquia Stella Maris'
					},
					contact: {
						id: '6ff334fc-6b89-4660-9c98-46d912d9b903',
						name: 'Angel',
						phone: '8493412807'
					}
				}
			});
		}, 100);
	};

	render() {
		if (Object.keys(this.state.event).length === 0) return <Text>Cargando...</Text>;

		return <Event event={this.state.event} />;
	}
}

export default EventContainer;
