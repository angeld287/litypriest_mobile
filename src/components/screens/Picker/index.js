import React, { Component } from 'react';
import { Text, View, Platform, Picker, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

class CustomPicker extends Component {
	state = {
		visible: false,
		elements: [],
		filteredElements: [],
		filter: ''
	};

	_showDialog = () => this.setState({ visible: true });

	_hideDialog = () => this.setState({ visible: false, filteredElements: this.state.elements });

	filterEvents = (filter) => {
		if (filter === '') {
			this.setState({
				filter,
				filteredElements: this.state.elements
			});
		} else {
			// console.log(this.state.elements);
			let filteredElements = this.state.elements.filter((element) =>
				element.name.toLowerCase().includes(filter.toLowerCase())
			);
			this.setState({
				filter,
				filteredElements
			});
		}
	};

	componentDidMount = () => {
		this.setState({
			elements: this.props.elements,
			filteredElements: this.props.elements
		});
	};

	onChangeValue = (id) => {
		this.props.setEvent({
			...this.props.event,
			[this.props.propertyName]: id
		});
		this.props.setValue(this.props.propertyName, id);
		this._hideDialog();
	};

	render() {
		return (
			<View style={{ paddingVertical: 15 }}>
				<TouchableOpacity onPress={this._showDialog}>
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
							{this.props.event[this.props.propertyName] === '' ? (
								<Text>No tiene</Text>
							) : (
								this.props.elements.find(
									(element) => element.id === this.props.event[this.props.propertyName]
								).name
							)}
						</Text>
					</View>
				</TouchableOpacity>

				<Portal>
					<Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
						<Dialog.Content>
							{/* <TouchableOpacity onPress={() => this.onChangeValue('')}>
								<View style={{ paddingVertical: 10, paddingHorizontal: 7 }}>
									<Text style={{ fontSize: 17, lineHeight: 20, maxHeight: 20 }}>No tiene</Text>
								</View>
							</TouchableOpacity> */}
							<TextInput onChangeText={this.filterEvents} placeholder="Buscar elementos" />
							{this.state.filteredElements.map((element) => (
								<TouchableOpacity onPress={() => this.onChangeValue(element.id)} key={element.id}>
									<View style={{ paddingVertical: 10, paddingHorizontal: 7 }}>
										<Text style={{ fontSize: 17, lineHeight: 20, maxHeight: 20 }}>
											{element.name}
										</Text>
									</View>
								</TouchableOpacity>
							))}
						</Dialog.Content>
					</Dialog>
				</Portal>
			</View>
		);

		// 	return (
		// 		<Picker
		// 			selectedValue={this.props.selectedValue}
		// 			onValueChange={(itemValue) => {
		// 				this.props.setEvent({
		// 					...this.props.event,
		// 					category: itemValue
		// 				});
		// 				this.props.setValue('category', itemValue);
		// 			}}
		// 		>
		// 			{this.props.elements.map((category) => (
		// 				<Picker.Item key={category.id} label={category.name} value={category.id} />
		// 			))}
		// 		</Picker>
		// 	);
		// }

		// state = {
		// 	dataSource: this.props.elements,
		// 	placeHolderText: 'Please Select Country',
		// 	selectedText: ''
		// };

		// _selectedValue(index, item) {
		// 	this.setState({ selectedText: item.name });
		// }

		// render() {
		// 	return (
		// 		<RNPicker
		// 			dataSource={this.state.dataSource}
		// 			dummyDataSource={this.state.dataSource}
		// 			defaultValue={false}
		// 			pickerTitle={'Country Picker'}
		// 			showSearchBar={true}
		// 			disablePicker={false}
		// 			changeAnimation={'none'}
		// 			searchBarPlaceHolder={'Search.....'}
		// 			showPickerTitle={true}
		// 			searchBarContainerStyle={this.props.searchBarContainerStyle}
		// 			pickerStyle={Styles.pickerStyle}
		// 			pickerItemTextStyle={Styles.listTextViewStyle}
		// 			selectedLabel={this.state.selectedText}
		// 			placeHolderLabel={this.state.placeHolderText}
		// 			selectLabelTextStyle={Styles.selectLabelTextStyle}
		// 			placeHolderTextStyle={Styles.placeHolderTextStyle}
		// 			dropDownImageStyle={Styles.dropDownImageStyle}
		// 			//dropDownImage={require('./res/ic_drop_down.png')}
		// 			selectedValue={(index, item) => this._selectedValue(index, item)}
		// 		/>
		// 	);
		// }
	}

	// const Styles = StyleSheet.create({
	// 	container: {
	// 		flex: 1,
	// 		alignItems: 'center',
	// 		justifyContent: 'center'
	// 	},

	// 	searchBarContainerStyle: {
	// 		marginBottom: 10,
	// 		flexDirection: 'row',
	// 		height: 40,
	// 		shadowOpacity: 1.0,
	// 		shadowRadius: 5,
	// 		shadowOffset: {
	// 			width: 1,
	// 			height: 1
	// 		},
	// 		backgroundColor: 'rgba(255,255,255,1)',
	// 		shadowColor: '#d3d3d3',
	// 		borderRadius: 10,
	// 		elevation: 3,
	// 		marginLeft: 10,
	// 		marginRight: 10
	// 	},

	// 	selectLabelTextStyle: {
	// 		color: '#000',
	// 		textAlign: 'left',
	// 		width: '99%',
	// 		padding: 10,
	// 		flexDirection: 'row'
	// 	},
	// 	placeHolderTextStyle: {
	// 		color: '#D3D3D3',
	// 		padding: 10,
	// 		textAlign: 'left',
	// 		width: '99%',
	// 		flexDirection: 'row'
	// 	},
	// 	dropDownImageStyle: {
	// 		marginLeft: 10,
	// 		width: 10,
	// 		height: 10,
	// 		alignSelf: 'center'
	// 	},
	// 	listTextViewStyle: {
	// 		color: '#000',
	// 		marginVertical: 10,
	// 		flex: 0.9,
	// 		marginLeft: 20,
	// 		marginHorizontal: 10,
	// 		textAlign: 'left'
	// 	},
	// 	pickerStyle: {
	// 		marginLeft: 18,
	// 		elevation: 3,
	// 		paddingRight: 25,
	// 		marginRight: 10,
	// 		marginBottom: 2,
	// 		shadowOpacity: 1.0,
	// 		shadowOffset: {
	// 			width: 1,
	// 			height: 1
	// 		},
	// 		borderWidth: 1,
	// 		shadowRadius: 10,
	// 		backgroundColor: 'rgba(255,255,255,1)',
	// 		shadowColor: '#d3d3d3',
	// 		borderRadius: 5,
	// 		flexDirection: 'row'
	// 	}
}

export default CustomPicker;
