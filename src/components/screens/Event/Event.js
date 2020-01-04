import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import Map from './Map';
import FloatingButtons from '../../Floating buttoms';
import moment from 'moment';
import { Icon } from 'react-native-elements';

const Event = ({ event, fab }) => {
	console.log(event);
	return (
		<View style={{ ...styles.container }}>
			<Map location={event.location.location} />
			<ScrollView style={{ ...styles.dataContainer }}>
				<View style={{ alignItems: 'flex-end' }}>
					<Text style={{ fontSize: 17, textDecorationLine: 'underline' }}>
						{moment(event.date).format('DD/MM/YYYY')}
					</Text>
				</View>
				<Text style={styles.eventName}>{event.name}</Text>
				<View style={{ flexDirection: 'row' }}>
					<Icon name="md-book" size={24} type="ionicon" color="#2196f3" />
					{event.description ? (
						<Text style={styles.propertyContainer}>{event.description}</Text>
					) : (
						<Text>No tiene descripción</Text>
					)}
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Icon name="md-pin" type="ionicon" size={25} color="#f44336" />
					<Text style={styles.propertyContainer}>{event.location.name}</Text>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Icon name="md-key" size={24} type="ionicon" color="#009688" />
					<Text style={styles.propertyContainer}>{event.category.name}</Text>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Icon name="md-contact" size={24} type="ionicon" color="#e91e63" />
					<Text style={styles.propertyContainer}>
						<Text style={styles.propertyName}>Contacto:</Text>{' '}
						{event.contacts.items.length !== 0 ? (
							`${event.contacts.items[0].contact.name} ${event.contacts.items[0].contact.phone}`
						) : (
							<Text>No tiene contacto</Text>
						)}
					</Text>
				</View>
			</ScrollView>
			<FloatingButtons fab={fab} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
		//	backgroundColor: '#fafafa'
	},
	dataContainer: {
		paddingHorizontal: 15
		//alignItems: 'stretch'
	},
	eventName: {
		fontSize: 30,
		textDecorationLine: 'underline',
		fontWeight: 'bold',
		marginBottom: 15
	},
	propertyName: {
		fontWeight: 'bold'
	},
	propertyContainer: {
		marginBottom: 10,
		fontSize: 15,
		marginLeft: 15
	}
});

export default Event;
