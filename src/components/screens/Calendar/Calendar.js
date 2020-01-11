import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { withNavigation } from 'react-navigation';
import moment from 'moment';

const CalendarContainer = (props) => {
	const { events, navigation } = props;
	let markedDates = {};

	events.forEach((event) => {
		markedDates[moment(event.date).format('YYYY-MM-DD')] = {
			selected: true,
			marked: true,
			selectedColor: 'blue'
		};
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
