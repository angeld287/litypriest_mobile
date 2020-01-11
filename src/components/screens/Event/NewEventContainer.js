import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import EventForm from './EventForm';
import { API, graphqlOperation } from 'aws-amplify';
import { listCategorys, listContacts, listLocations } from '../../../amplify/queries';
import { createEvent, createEventLocations, createEventContacts } from '../../../amplify/mutations';
import Spinner from '../../ActivityIndicator';

const NewEventContainer = ({ navigation }) => {
	const [ event, setEvent ] = React.useState({});
	const [ categories, setCategories ] = React.useState([]);
	const [ contacts, setContacts ] = React.useState([]);
	const [ locations, setLocations ] = React.useState([]);
	const [ loading, setLoading ] = React.useState(true);
	const [ error, setError ] = React.useState(false);

	React.useEffect(() => {
		//const fetchEvent = async () => await API.graphql(graphqlOperation(getEvent, { id }));
		const fetchCategories = async () => await API.graphql(graphqlOperation(listCategorys, { limit: 400 }));
		const fetchContacts = async () => await API.graphql(graphqlOperation(listContacts, { limit: 400 }));
		const fetchLocations = async () => await API.graphql(graphqlOperation(listLocations, { limit: 400 }));

		const fetchData = async () => {
			const [ /* eventAPI, */ categoriesAPI, contactsAPI, locationsAPI ] = await Promise.all([
				// fetchEvent(),
				fetchCategories(),
				fetchContacts(),
				fetchLocations()
			]);

			setEvent({
				...event,
				date: `${navigation.state.params.day}T00:00:01`,
				category: categoriesAPI.data.listCategorys.items[0].id,
				location: locationsAPI.data.listLocations.items[0].id,
				contacts: []
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
			eventCategoryId: data.category,
			duration: data.duration,
			eventLocationId: data.location
		};

		try {
			const createdEvent = await API.graphql(
				graphqlOperation(createEvent, {
					input: eventData
				})
			);
			if (data.contacts) {
				data.contacts.forEach(async (contact) => {
					const eventContactData = {
						eventContactsEventId: createdEvent.data.createEvent.id,
						eventContactsContactId: contact
					};

					await API.graphql(
						graphqlOperation(createEventContacts, {
							input: eventContactData
						})
					);
				});
			}

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
			action="create"
		/>
	);
};

export default NewEventContainer;
