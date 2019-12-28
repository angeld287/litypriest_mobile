import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default class DatePicker extends Component {
	state = {
		show: false
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
			show: true
		});
	};

	render() {
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
						<Text style={{ fontSize: 15 }}>{moment(this.props.date).format('DD/MM/YYYY')}</Text>
					</View>
				</TouchableOpacity>

				{this.state.show && (
					<DateTimePicker
						value={moment(this.props.date).toDate()}
						onChange={(value) => {
							this.setState({
								show: false
							});
							this.props.handleDateChange(value);
						}}
					/>
				)}
			</View>
		);
	}
}
