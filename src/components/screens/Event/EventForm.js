import React from 'react';
import { Text, View, Button, KeyboardAvoidingView, StyleSheet } from 'react-native';
import useForm from 'react-hook-form';
import { Input } from 'react-native-elements';
import DatePicker from './DateTimePicker';
import moment from 'moment';
import { TextInput } from 'react-native-paper';
import CustomPicker from '../Picker';

const EventForm = ({ event, categories, locations, contacts, setEvent, onSubmit }) => {
	const { register, setValue, handleSubmit, errors, formState } = useForm({
		defaultValues: {
			...event,
			contact: event.contact,
			location: event.location
		}
	});

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
			<TextInput
				ref={register({ name: 'name' })}
				onChangeText={(text) => setValue('name', text)}
				label="Nombre del evento"
				defaultValue={event.name}
				mode="outlined"
				autoCompleteType="off"
				style={styles.textInput}
				theme={{
					colors: {
						primary: '#68c462'
					}
				}}
			/>
			{errors.firstName && <Text>This is required.</Text>}

			<TextInput
				ref={register({ name: 'description' })}
				onChangeText={(text) => setValue('description', text)}
				label="Descripcion del evento"
				defaultValue={event.description}
				mode="outlined"
				autoCompleteType="off"
				style={styles.textInput}
				theme={{
					colors: {
						primary: '#68c462'
					}
				}}
			/>
			{errors.description && <Text>This is required.</Text>}

			<CustomPicker
				ref={register({ name: 'category' })}
				setEvent={setEvent}
				setValue={setValue}
				elements={categories}
				event={event}
				propertyName="category"
			/>

			<DatePicker
				ref={register({ name: 'date' })}
				date={event.date}
				handleDateChange={handleDateChange}
				register={register}
			/>

			<CustomPicker
				ref={register({ name: 'contact' })}
				setEvent={setEvent}
				setValue={setValue}
				elements={contacts}
				event={event}
				propertyName="contact"
			/>

			{/* <Picker
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
			</Picker> */}

			{/* <Picker
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
			</Picker> */}

			<CustomPicker
				ref={register({ name: 'location' })}
				setEvent={setEvent}
				setValue={setValue}
				elements={locations}
				event={event}
				propertyName="location"
			/>

			<View>
				<Button onPress={handleSubmit(onSubmit)} disabled={formState.isSubmitting} title="Guardar" />
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	textInput: {
		backgroundColor: 'white',
		marginBottom: 10
	}
});

export default EventForm;
