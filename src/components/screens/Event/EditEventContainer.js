import React from 'react';
import EventForm from './EventForm';
import { Text, Alert } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent, listCategorys, listContacts, listLocations } from '../../../amplify/queries';
import { updateEvent, updateEventLocations, updateEventContacts } from '../../../amplify/mutations';
import Spinner from '../../ActivityIndicator';

export default function EditEventContainer(props) {
	const { id } = props.navigation.state.params;
	const [ event, setEvent ] = React.useState({});
	const [ relationKeys, setRelationKeys ] = React.useState({});
	const [ categories, setCategories ] = React.useState([]);
	const [ contacts, setContacts ] = React.useState([]);
	const [ locations, setLocations ] = React.useState([]);
	const [ loading, setLoading ] = React.useState(true);
	const [ error, setError ] = React.useState(false);

	React.useEffect(
		() => {
			const fetchEvent = async () => await API.graphql(graphqlOperation(getEvent, { id }));
			const fetchCategories = async () => await API.graphql(graphqlOperation(listCategorys));
			const fetchContacts = async () => await API.graphql(graphqlOperation(listContacts));
			const fetchLocations = async () => await API.graphql(graphqlOperation(listLocations));

			const fetchData = async () => {
				const [ eventAPI, categoriesAPI, contactsAPI, locationsAPI ] = await Promise.all([
					fetchEvent(),
					fetchCategories(),
					fetchContacts(),
					fetchLocations()
				]);

				setCategories(categoriesAPI.data.listCategorys.items);
				setContacts(contactsAPI.data.listContacts.items);
				setLocations(locationsAPI.data.listLocations.items);
				//console.log(eventAPI);
				setRelationKeys({
					locationKey: eventAPI.data.getEvent.location.items[0].id,
					contactKey: eventAPI.data.getEvent.contacts.items[0].id
				});
				setEvent({
					...eventAPI.data.getEvent,
					category: eventAPI.data.getEvent.category.id,
					contact: eventAPI.data.getEvent.contacts.items[0].contact.id,
					location: eventAPI.data.getEvent.location.items[0].location.id
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
		//console.log(data);
		const eventData = {
			id: event.id,
			name: data.name,
			description: data.description,
			date: data.date,
			eventCategoryId: data.category
		};
		const eventLocationData = {
			id: relationKeys.locationKey,
			eventLocationsLocationId: data.location
		};
		const eventContactData = {
			id: relationKeys.contactKey,
			eventContactsContactId: data.contact
		};
		try {
			await API.graphql(
				graphqlOperation(updateEvent, {
					input: eventData
				})
			);

			await API.graphql(
				graphqlOperation(updateEventLocations, {
					input: eventLocationData
				})
			);

			await API.graphql(
				graphqlOperation(updateEventContacts, {
					input: eventContactData
				})
			);

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
