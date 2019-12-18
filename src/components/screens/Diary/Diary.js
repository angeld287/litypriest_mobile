import React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import EventItem from './EventItem';

const Diary = ({ events }) => {
	return <FlatList data={events} renderItem={(event) => <EventItem key={event.item.id} event={event.item} />} />;
};

export default Diary;
