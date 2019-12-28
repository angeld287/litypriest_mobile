import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';

const EventItem = ({ event, navigation }) => {
	return (
		<Card style={styles.card}>
			<TouchableOpacity onPress={() => navigation.navigate('Event', { id: event.id })}>
				<Card.Content>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
						<Icon name="md-clipboard" type="ionicon" color="#009688" iconStyle={{ fontSize: 20 }} />
						<Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 4 }}>{event.name}</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon name="md-book" type="ionicon" color="#FFC107" iconStyle={{ fontSize: 20 }} />
						<Text style={{ marginLeft: 4 }}>{event.description}</Text>
					</View>
				</Card.Content>
			</TouchableOpacity>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {},
	card: {
		marginTop: 12,
		marginBottom: 3,
		paddingHorizontal: 15,
		paddingVertical: 20
	}
});

export default withNavigation(EventItem);
