import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import EventForm from './NewEventForm';
import { API, graphqlOperation } from 'aws-amplify';
import { listCategorys, listContacts, listLocations } from '../../../../amplify/queries';
import { createEvent, createEventLocations, createEventContacts } from '../../../../amplify/mutations';
import Spinner from '../../../ActivityIndicator';

const NewEventContainer = ({ navigation }) => {
	const [ event, setEvent ] = React.useState({});
	const [ categories, setCategories ] = React.useState([]);
	const [ contacts, setContacts ] = React.useState([]);
	const [ locations, setLocations ] = React.useState([]);
	const [ loading, setLoading ] = React.useState(true);
	const [ error, setError ] = React.useState(false);

	React.useEffect(() => {
		//const fetchEvent = async () => await API.graphql(graphqlOperation(getEvent, { id }));
		const fetchCategories = async () => await API.graphql(graphqlOperation(listCategorys));
		const fetchContacts = async () => await API.graphql(graphqlOperation(listContacts));
		const fetchLocations = async () => await API.graphql(graphqlOperation(listLocations));

		const fetchData = async () => {
			const [ /* eventAPI, */ categoriesAPI, contactsAPI, locationsAPI ] = await Promise.all([
				// fetchEvent(),
				fetchCategories(),
				fetchContacts(),
				fetchLocations()
			]);

			setEvent({
				...event,
				date: navigation.state.params.day,
				category: categoriesAPI.data.listCategorys.items[0].id,
				location: locationsAPI.data.listLocations.items[0].id,
				contact: contactsAPI.data.listContacts.items[0].id
			});

			setCategories(categoriesAPI.data.listCategorys.items);
			setContacts(contactsAPI.data.listContacts.items);
			setLocations(locationsAPI.data.listLocations.items);
			setLoading(false);
		};

		try {
			fetchData();
		} catch (error) {
			setLoading(false);
			setError(true);
		}
	}, []);

	const onSubmit = async (data) => {
		const eventData = {
			name: data.name,
			description: data.description,
			date: data.date,
			eventCategoryId: data.category
		};

		try {
			const createdEvent = await API.graphql(
				graphqlOperation(createEvent, {
					input: eventData
				})
			);

			const eventLocationData = {
				eventLocationsEventId: createdEvent.data.createEvent.id,
				eventLocationsLocationId: data.location
			};
			const eventContactData = {
				eventContactsEventId: createdEvent.data.createEvent.id,
				eventContactsContactId: data.contact
			};

			await API.graphql(
				graphqlOperation(createEventLocations, {
					input: eventLocationData
				})
			);
			await API.graphql(
				graphqlOperation(createEventContacts, {
					input: eventContactData
				})
			);

			Alert.alert('Creado correctamente', '', [
				{
					text: 'OK',
					onPress: () => {
						navigation.navigate('Home');
					}
				}
			]);
		} catch (error) {
			console.log(error);
			Alert.alert('Ha ocurrido un error', 'Intentelo nuevamente', [
				{
					text: 'OK'
				}
			]);
		}
	};

	if (loading) return <Spinner />;
	if (error) return <Text>Error</Text>;

	return (
		<EventForm
			event={event}
			categories={categories}
			contacts={contacts}
			locations={locations}
			setEvent={setEvent}
			onSubmit={onSubmit}
		/>
	);
};

export default NewEventContainer;
