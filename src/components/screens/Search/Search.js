import React from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import EventItem from '../Diary/EventItem';

const Search = ({ events, filter, filterEvents }) => {
	var currentDate = '';
	return (
		<View style={{ marginBottom: 50, paddingHorizontal: 15 }}>
			<TextInput placeholder="Buscar evento" value={filter} onChangeText={filterEvents} />
			{events.length === 0 ? (
				<Text style={{ marginTop: 5 }}>No se encontraron eventos</Text>
			) : (
				<ScrollView>
					{events.map((event) => {
						if (event.date !== currentDate) {
							currentDate = event.date;
							return (
								<React.Fragment key={event.id}>
									<Text style={{ marginTop: 5, fontSize: 15, color: 'gray' }}>{event.date}</Text>
									<EventItem event={event} />
								</React.Fragment>
							);
						} else {
							return <EventItem event={event} key={event.id} />;
						}
					})}
				</ScrollView>
			)}
		</View>
	);
};

export default Search;
