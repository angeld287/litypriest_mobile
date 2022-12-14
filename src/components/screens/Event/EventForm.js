import React from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import useForm from 'react-hook-form';
import DatePicker from './DateTimePicker';
import moment from 'moment';
import { Button } from 'react-native-elements';
import { TextInput, Title } from 'react-native-paper';
import CustomPicker from '../Picker';
import CustomMultiPicker from '../Picker/CustomMultiPicker';

const EventForm = ({ event, categories, locations, contacts, setEvent, onSubmit, action }) => {
	const { register, setValue, handleSubmit, errors, formState } = useForm({
		defaultValues: event
	});

	const handleDateChange = (date) => {
		setEvent({
			...event,
			date
		});
		setValue('date', date);
	};
	// console.log(event);
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : null}
			keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
			style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}
		>
			<ScrollView>
				<Title style={{ alignSelf: 'center', fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>
					{action === 'update' ? <Text>Editar evento</Text> : <Text>Crear nuevo evento</Text>}
				</Title>
				<TextInput
					ref={register({ name: 'name' }, { required: true })}
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
				{errors.firstName && <Text>Este campo es requerido</Text>}

				<TextInput
					ref={register({ name: 'description' }, { required: true })}
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
				{errors.description && <Text>Este campo es requerido</Text>}

				<TextInput
					keyboardType="number-pad"
					ref={register({ name: 'duration' }, { required: true })}
					onChangeText={(text) => setValue('duration', text)}
					label="Duraci??n del evento en horas"
					defaultValue={event.duration}
					mode="outlined"
					autoCompleteType="off"
					style={styles.textInput}
					theme={{
						colors: {
							primary: '#68c462'
						}
					}}
					returnKeyType="next"
				/>
				{errors.firstName && <Text>Este campo es requerido</Text>}

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
					type="date"
				/>

				<CustomMultiPicker
					ref={register({ name: 'contacts' })}
					setEvent={setEvent}
					setValue={setValue}
					elements={contacts}
					event={event}
					propertyName="contacts"
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
					<Button
						loading={formState.isSubmitting}
						onPress={handleSubmit(onSubmit)}
						disabled={formState.isSubmitting || formState.isSubmitted}
						title={action === 'update' ? 'Guardar' : 'Crear'}
					/>
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
