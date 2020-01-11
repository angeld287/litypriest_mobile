import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default class DatePicker extends Component {
	state = {
		showDate: false,
		shotTime: false
	};

	// setDate = (event, date) => {
	// 	date = date || this.state.date;

	// 	this.setState({
	// 		show: Platform.OS === 'ios' ? true : false,
	// 		date
	// 	});
	// };

	showDatePicker = () => {
		this.setState({
			showDate: true
		});
	};

	render() {
		// console.log(this.props.date);
		return (
			<View>
				<TouchableOpacity onPress={this.showDatePicker}>
					<View
						style={{
							alignContent: 'flex-start',
							borderWidth: 1,
							borderColor: 'gray',
							height: 55,
							justifyContent: 'center',
							borderRadius: 5,
							paddingHorizontal: 15
						}}
					>
						<Text style={{ fontSize: 15 }}>
							{moment(this.props.date.replace('Z', '')).format('dddd DD/MM/YYYY [a las] hh:mm A')}
						</Text>
					</View>
				</TouchableOpacity>

				{this.state.showDate && (
					<DateTimePicker
						value={new Date(this.props.date)}
						onChange={(value) => {
							this.setState({
								showDate: false,
								showTime: true
							});
							console.log(this.props.date);
							if (value.type === 'set') {
								var dateComponents = this.props.date.split('T');
								var newDate = `${moment(value.nativeEvent.timestamp).format(
									'YYYY-MM-DD'
								)}T${dateComponents[1]}`;
								this.props.handleDateChange(newDate);
							}
						}}
					/>
				)}

				{this.state.showTime && (
					<DateTimePicker
						mode="time"
						value={moment(this.props.date.replace('Z', '')).toDate()}
						onChange={(value) => {
							this.setState({
								showDate: false,
								showTime: false
							});
							if (value.type === 'set') {
								var dateComponents = this.props.date.split('T');
								let hour = moment(value.nativeEvent.timestamp)
									.subtract(4, 'hours')
									.toISOString()
									.split('T')[1]
									.replace('Z', '');
								console.log(hour);
								var newDate = `${dateComponents[0]}T${hour}`;
								// console.log(newDate);
								this.props.handleDateChange(newDate);
							}
						}}
					/>
				)}
			</View>
		);
	}
}
