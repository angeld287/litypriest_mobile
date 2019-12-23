import React from 'react';
import EventForm from './EventForm';
import { Text } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent, listCategorys, listContacts, listLocations } from '../../../amplify/queries';

export default function EditEventContainer(props) {
	const { id } = props.navigation.state.params;
	const [ event, setEvent ] = React.useState({});
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

				setEvent({
					...eventAPI.data.getEvent,
					category: eventAPI.data.getEvent.category.id,
					contacts: eventAPI.data.getEvent.contacts.items[0],
					location: eventAPI.data.getEvent.location.items[0]
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
		},
		[ id ]
	);

	if (loading) return <Text>Cargando</Text>;
	if (error) return <Text>Error</Text>;

	return (
		<EventForm
			event={event}
			categories={categories}
			contacts={contacts}
			locations={locations}
			setEvent={setEvent}
			navigate={props.navigation.navigate}
		/>
	);
}
