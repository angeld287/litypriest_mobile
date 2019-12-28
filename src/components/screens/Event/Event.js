import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Map from './Map';
import FloatingButtons from '../../Floating buttoms';
import moment from 'moment';

const Event = ({ event, fab }) => {
	return (
		<View style={styles.container}>
			<Map location={event.location.location} />
			<View style={styles.dataContainer}>
				<Text style={styles.eventName}>{event.name}</Text>
				<Text style={styles.propertyContainer}>
					<Text style={styles.propertyName}>Tipo de evento:</Text> {event.category.name}
				</Text>
				<Text style={styles.propertyContainer}>
					<Text style={styles.propertyName}>Evento especial:</Text> {event.description}
				</Text>
				<Text style={styles.propertyContainer}>
					<Text style={styles.propertyName}>Fecha:</Text> {moment(event.date).format('DD/MM/YYYY')}
				</Text>
				<Text style={styles.propertyContainer}>
					<Text style={styles.propertyName}>Lugar:</Text> {event.location.name}
				</Text>
				<Text style={styles.propertyContainer}>
					<Text style={styles.propertyName}>Contacto:</Text> {event.contacts.items[0].contact.name} -{' '}
					{event.contacts.items[0].contact.phone}
				</Text>
			</View>
			<FloatingButtons fab={fab} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
		// backgroundColor: '#fafafa'
	},
	dataContainer: {
		paddingHorizontal: 15
	},
	eventName: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 15
	},
	propertyName: {
		fontWeight: 'bold'
	},
	propertyContainer: {
		marginBottom: 10,
		fontSize: 15
	}
});

export default Event;
