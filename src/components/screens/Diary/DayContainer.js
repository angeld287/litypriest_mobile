import React from 'react';
import { View, Text, FlatList } from 'react-native';
import EventItem from './EventItem';
import FloattingButtons from '../../Floating buttoms';
import moment from 'moment';

const DayContainer = ({ navigation }) => {
	const { events, day } = navigation.state.params;
	const eventsFiltered = events.filter((event) => moment(event.date).format('YYYY-MM-DD') === day);

	const floattingButtonData = {
		fabIcon: 'md-add',
		actions: [],
		onPress: () => {
			navigation.navigate('NewEvent', { day });
		}
	};

	return (
		<View
			style={{
				paddingHorizontal: 15,
				flex: 1,
				backgroundColor: '#f7f7f7'
			}}
		>
			{eventsFiltered.length === 0 ? (
				<Text style={{ alignSelf: 'center', marginTop: 20, color: '#828282' }}>No hay eventos este dia</Text>
			) : (
				<FlatList
					data={eventsFiltered}
					renderItem={(event) => <EventItem key={event.item.id} event={event.item} />}
				/>
			)}
			<FloattingButtons fab={floattingButtonData} />
		</View>
	);
};

export default DayContainer;
