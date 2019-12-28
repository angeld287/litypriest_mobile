import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { withNavigation } from 'react-navigation';

const CalendarContainer = (props) => {
	const { events, navigation } = props;
	let markedDates = {};

	events.forEach((event) => {
		markedDates[event.date] = { selected: true, marked: true, selectedColor: 'blue' };
	});

	return (
		<View>
			<CalendarList
				markedDates={markedDates}
				onDayPress={(day) => {
					navigation.navigate('Day', { day: day.dateString, events });
				}}
				theme={{
					calendarBackground: '#f7f7f7',
					textMonthFontWeight: 'bold'
				}}
			/>
		</View>
	);
};

export default withNavigation(CalendarContainer);
