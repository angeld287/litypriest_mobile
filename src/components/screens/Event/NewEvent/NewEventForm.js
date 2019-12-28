import React from 'react';
import { Text, View, Button, KeyboardAvoidingView, StyleSheet, ScrollView, Platform } from 'react-native';
import useForm from 'react-hook-form';
import { TextInput, Title } from 'react-native-paper';
import CustomPicker from './../../Picker';

import moment from 'moment';
import DatePicker from '../DateTimePicker';

const EventForm = ({ event, categories, locations, contacts, setEvent, onSubmit }) => {
	const { register, setValue, handleSubmit, errors, formState } = useForm({
		defaultValues: event
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
	console.log(event);
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : null}
			keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
			style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}
		>
			<ScrollView>
				<Title style={{ alignSelf: 'center', fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>
					Crear nuevo evento
				</Title>
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

				<CustomPicker
					ref={register({ name: 'location' })}
					setEvent={setEvent}
					setValue={setValue}
					elements={locations}
					event={event}
					propertyName="location"
				/>

				<View>
					<Button onPress={handleSubmit(onSubmit)} disabled={formState.isSubmitting} title="Crear" />
				</View>
			</ScrollView>
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
