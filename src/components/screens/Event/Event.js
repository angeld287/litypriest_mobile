import React from 'react';
import { View, Text } from 'react-native';
import Map from './Map';

const Event = ({ event }) => {
	return (
		<View>
			<Text>{event.name}</Text>
			<Text>Evento: {event.category.name}</Text>
			<Text>Evento especial: {event.description}</Text>
			<Text>Fecha: {event.date}</Text>
			<Text>Lugar: {event.location.name}</Text>
			<Text>
				Contacto: {event.contact.name} - {event.contact.phone}
			</Text>

			<Map location={event.location.name} />
		</View>
	);
};

export default Event;
