import React, { PureComponent } from 'react';
import Diary from './Diary';
import { Text, ActivityIndicator } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from '../../../amplify/queries';
import Spinner from '../../ActivityIndicator';

class DiaryContainer extends PureComponent {
	state = {
		events: [],
		loading: true,
		error: false
	};

	fetchEvents = async () => {
		try {
			const events = await API.graphql(graphqlOperation(listEvents));
			this.setState({
				events: events.data.listEvents.items,
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

	componentDidMount = async () => {
		this.fetchEvents();
		this.props.navigation.addListener('didFocus', () => {
			this.fetchEvents();
		});
	};

	render() {
		if (this.state.loading) return <Spinner />;
		if (this.state.error) return <Text>Error</Text>;
		return <Diary events={this.state.events} />;
	}
}

export default DiaryContainer;
