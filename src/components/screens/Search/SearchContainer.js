import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Search from './Search';
import Spinner from '../../ActivityIndicator';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from '../../../amplify/queries';

class SearchContainer extends Component {
	state = {
		events: [],
		filteredEvents: [],
		loading: true,
		error: false,
		filter: ''
	};

	filterEvents = (filter) => {
		if (filter === '') {
			this.setState({
				filter,
				filteredEvents: this.state.events
			});
		} else {
			let filteredEvents = this.state.events.filter((event) =>
				event.name.toLowerCase().includes(filter.toLowerCase())
			);
			this.setState({
				filter,
				filteredEvents
			});
		}
	};

	fetchEvents = async () => {
		try {
			const events = await API.graphql(graphqlOperation(listEvents));
			const ordenedEvents = events.data.listEvents.items.sort((a, b) => {
				if (a.date > b.date) {
					return 1;
				}
				if (a.date < b.date) {
					return -1;
				}
				return 0;
			});

			this.setState({
				events: ordenedEvents,
				filteredEvents: ordenedEvents,
				loading: false
			});
		} catch (error) {
			//console.log(error);
			this.setState({
				loading: false,
				error: true
			});
		}
	};

	componentDidMount = () => {
		this.fetchEvents();
	};

	render() {
		if (this.state.loading) return <Spinner />;
		if (this.state.error) return <Text>Error</Text>;
		return (
			<Search events={this.state.filteredEvents} filter={this.state.filter} filterEvents={this.filterEvents} />
		);
	}
}

export default SearchContainer;
