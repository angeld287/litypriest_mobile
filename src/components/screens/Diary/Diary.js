import React from 'react';
import { View, Text } from 'react-native';
import CalendarContainer from '../Calendar/Calendar';

const Diary = ({ events }) => {
	return (
		// <View>
		// 	<CalendarContainer events={events} />
		// </View>
		<CalendarContainer events={events} />
	);
};

export default Diary;
