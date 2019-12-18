import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

const EventItem = ({ event, navigation }) => {
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Event', { id: event.id })}>
			<View style={styles.container}>
				<Text>{event.name}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		paddingVertical: 5
	}
});

export default withNavigation(EventItem);
