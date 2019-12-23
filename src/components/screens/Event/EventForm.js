import React from 'react';
import { Text, View, Button, KeyboardAvoidingView, Picker, Alert } from 'react-native';
import useForm from 'react-hook-form';
import { Input } from 'react-native-elements';
import { API, graphqlOperation } from 'aws-amplify';
import DatePicker from './DateTimePicker';
import moment from 'moment';
import { updateEvent, updateEventLocations, updateEventContacts } from '../../../amplify/mutations';

const EventForm = ({ event, categories, locations, contacts, setEvent, navigate }) => {
	const { register, setValue, handleSubmit, errors } = useForm({
		defaultValues: {
			...event,
			contacts: event.contacts.contact.id,
			location: event.location.location.id
		}
	});

	const onSubmit = async (data) => {
		const eventData = {
			id: event.id,
			name: data.name,
			description: data.description,
			date: data.date,
			eventCategoryId: data.category
		};
		const eventLocationData = {
			id: event.location.id,
			eventLocationsLocationId: data.location
		};
		const eventContactData = {
			id: event.contacts.id,
			eventContactsContactId: data.contacts
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
						navigate('Home');
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

	const handleDateChange = (value) => {
		if (value.type === 'set') {
			let date = moment(value.nativeEvent.timestamp).format('YYYY-MM-DD');
			setEvent({
				...event,
				date
			});
			setValue('date', date);
		}
	};

	return (
		<KeyboardAvoidingView>
			<Input
				ref={register({ name: 'name' })}
				onChangeText={(text) => setValue('name', text)}
				placeholder="Nombre del evento"
				defaultValue={event.name}
			/>
			{errors.firstName && <Text>This is required.</Text>}

			<Input
				ref={register({ name: 'description' })}
				onChangeText={(text) => setValue('description', text)}
				placeholder="Descripcion del evento"
				defaultValue={event.description}
			/>
			{errors.description && <Text>This is required.</Text>}

			<Picker
				selectedValue={event.category}
				ref={register({ name: 'category' })}
				onValueChange={(itemValue) => {
					setEvent({
						...event,
						category: itemValue
					});
					setValue('category', itemValue);
				}}
			>
				{categories.map((category) => (
					<Picker.Item key={category.id} label={category.name} value={category.id} />
				))}
			</Picker>

			<DatePicker
				ref={register({ name: 'date' })}
				date={event.date}
				handleDateChange={handleDateChange}
				register={register}
			/>

			<Picker
				selectedValue={event.contacts.contact.id}
				ref={register({ name: 'contacts' })}
				onValueChange={(itemValue) => {
					setEvent({
						...event,
						contacts: {
							...event.contacts,
							contact: {
								...event.contacts.contact,
								id: itemValue
							}
						}
					});
					setValue('contacts', itemValue);
				}}
			>
				{contacts.map((contact) => <Picker.Item key={contact.id} label={contact.name} value={contact.id} />)}
			</Picker>

			<Picker
				selectedValue={event.location.location.id}
				ref={register({ name: 'location' })}
				onValueChange={(itemValue) => {
					setEvent({
						...event,
						location: {
							...event.location,
							location: {
								...event.location.location,
								id: itemValue
							}
						}
					});
					setValue('location', itemValue);
				}}
			>
				{locations.map((location) => (
					<Picker.Item key={location.id} label={location.name} value={location.id} />
				))}
			</Picker>

			<View>
				<Button onPress={handleSubmit(onSubmit)} title="Guardar" />
			</View>
		</KeyboardAvoidingView>
	);
};

export default EventForm;
