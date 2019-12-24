import React from 'react';
import { View, Text } from 'react-native';
import Map from './Map';
import FloatingButtons from '../../Floating buttoms';
import moment from 'moment';

const Event = ({ event, fab }) => {
	return (
		<View style={{ flex: 1 }}>
			<Text>{event.name}</Text>
			<Text>Evento: {event.category.name}</Text>
			<Text>Evento especial: {event.description}</Text>
			<Text>Fecha: {moment(event.date).format('DD/MM/YYYY')}</Text>
			<Text>Lugar: {event.location.name}</Text>
			<Text>
				Contacto: {event.contacts.items[0].contact.name} - {event.contacts.items[0].contact.phone}
			</Text>
			<Map location={event.location.location} />
			<FloatingButtons fab={fab} />
		</View>
	);
};

export default Event;
