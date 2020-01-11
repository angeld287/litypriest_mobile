import React from 'react';
import EventForm from './EventForm';
import { Text, Alert } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent, listCategorys, listContacts, listLocations } from '../../../amplify/queries';
import { updateEvent, createEventContacts, deleteEventContacts } from '../../../amplify/mutations';
import Spinner from '../../ActivityIndicator';

export default function EditEventContainer(props) {
	const { id } = props.navigation.state.params;
	const [ event, setEvent ] = React.useState({});
	const [ relations, setRelations ] = React.useState([]);
	const [ categories, setCategories ] = React.useState([]);
	const [ contacts, setContacts ] = React.useState([]);
	const [ locations, setLocations ] = React.useState([]);
	const [ loading, setLoading ] = React.useState(true);
	const [ error, setError ] = React.useState(false);

	React.useEffect(
		() => {
			const fetchEvent = async () => await API.graphql(graphqlOperation(getEvent, { id }));
			const fetchCategories = async () => await API.graphql(graphqlOperation(listCategorys, { limit: 400 }));
			const fetchContacts = async () => await API.graphql(graphqlOperation(listContacts, { limit: 400 }));
			const fetchLocations = async () => await API.graphql(graphqlOperation(listLocations, { limit: 400 }));

			const fetchData = async () => {
				const [ eventAPI, categoriesAPI, contactsAPI, locationsAPI ] = await Promise.all([
					fetchEvent(),
					fetchCategories(),
					fetchContacts(),
					fetchLocations()
				]);

				setRelations(eventAPI.data.getEvent.contacts.items);
				setCategories(categoriesAPI.data.listCategorys.items);
				setContacts(contactsAPI.data.listContacts.items);
				setLocations(locationsAPI.data.listLocations.items);

				setEvent({
					...eventAPI.data.getEvent,
					category: eventAPI.data.getEvent.category.id,
					location: eventAPI.data.getEvent.location.id,
					contacts: eventAPI.data.getEvent.contacts.items.map((contact) => contact.contact.id)
				});
				setLoading(false);
			};

			try {
				fetchData();
			} catch (error) {
				setLoading(false);
				setError(true);
			}
		},
		[ id ]
	);

	const onSubmit = async (data) => {
		const eventData = {
			id: event.id,
			name: data.name,
			description: data.description,
			date: data.date,
			duration: data.duration,
			eventCategoryId: data.category,
			eventLocationId: data.location
		};
		try {
			await API.graphql(
				graphqlOperation(updateEvent, {
					input: eventData
				})
			);

			relations.forEach((relation) => {
				let exists = data.contacts.findIndex((contact) => contact === relation.contact.id);
				if (exists === -1) {
					API.graphql(graphqlOperation(deleteEventContacts, { input: { id: relation.id } }));
				}
			});

			data.contacts.forEach((contact) => {
				let exists = relations.findIndex((relation) => relation.contact.id === contact);
				if (exists === -1) {
					const inputEventContact = {
						eventContactsEventId: event.id,
						eventContactsContactId: contact
					};

					API.graphql(graphqlOperation(createEventContacts, { input: inputEventContact }));
				}
			});

			Alert.alert('actualizado correctamente', '', [
				{
					text: 'OK',
					onPress: () => {
						props.navigation.navigate('Home');
					}
				}
			]);
		} catch (error) {
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
			action="update"
			// navigate={props.navigation.navigate}
		/>
	);
}
