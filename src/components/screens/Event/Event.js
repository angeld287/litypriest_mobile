import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Map from './Map';
import FloatingButtons from '../../Floating buttoms';
import moment from 'moment';
import { Icon, Badge, Divider } from 'react-native-elements';

const Event = ({ event, fab }) => {
	// console.log(event.date);
	return (
		<View style={{ ...styles.container }}>
			<Map location={event.location.coordinates} />
			<ScrollView style={{ ...styles.dataContainer }}>
				<View style={{ alignItems: 'flex-end' }}>
					<Text style={{ fontSize: 17, textDecorationLine: 'underline' }}>
						{moment(event.date.replace('Z', '')).format('dddd DD/MM/YYYY [a las] hh:mm A')}
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
					<Icon name="md-time" type="ionicon" size={25} color="#FFC107" />
					<Text style={styles.propertyContainer}>{event.duration} horas</Text>
				</View>
				<Divider style={{ backgroundColor: '#e9e9e9' }} />
				<View style={{ flexDirection: 'row' }}>
					<Icon name="md-pin" type="ionicon" size={25} color="#f44336" />
					<Text style={styles.propertyContainer}>{event.location.name}</Text>
				</View>
				{event.location.category.name === 'Parroquia' && (
					<View style={{ alignItems: 'center' }}>
						<Badge
							value="Contacto de la parroquia"
							status="primary"
							textStyle={{ fontSize: 15 }}
							badgeStyle={{ padding: 7, height: 25, alignItems: 'center' }}
						/>

						<Text style={{ fontSize: 15 }}>
							{event.location.contact.name} - {event.location.contact.phone}
						</Text>
					</View>
				)}
				<Divider style={{ backgroundColor: '#e9e9e9' }} />
				<View style={{ flexDirection: 'row' }}>
					<Icon name="md-key" size={24} type="ionicon" color="#009688" />
					<Text style={styles.propertyContainer}>{event.category.name}</Text>
				</View>
				<Divider style={{ backgroundColor: '#e9e9e9' }} />
				<View>
					<View style={{ flexDirection: 'row' }}>
						<Icon name="md-contact" size={24} type="ionicon" color="#e91e63" />
						<Text style={styles.propertyContainer}>Contactos:</Text>
					</View>
					{event.contacts.items.length !== 0 ? (
						<View>
							{event.contacts.items.map((contact) => (
								<Text key={contact.id}>
									<Text style={{ fontWeight: 'bold' }}>{contact.contact.name}</Text> -{' '}
									{contact.contact.phone}
								</Text>
							))}
						</View>
					) : (
						<Text>No tiene contacto</Text>
					)}
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
