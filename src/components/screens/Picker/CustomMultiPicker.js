import React, { Component } from 'react';
import { Text, View, Platform, Picker, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import { TextInput } from 'react-native';
import {} from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const { height } = Dimensions.get('window');

class CustomMultiPicker extends Component {
	state = {
		visible: false,
		elements: [],
		selectedElements: [],
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
		// console.log(this.props.elements);
		this.setState({
			elements: this.props.elements,
			filteredElements: this.props.elements,
			selectedElements: this.props.event[this.props.propertyName]
		});
	};

	onSelectElement = (id) => {
		let newSelectedItems = this.state.selectedElements;
		if (!this.state.selectedElements.includes(id)) {
			newSelectedItems.push(id);
		} else {
			newSelectedItems = newSelectedItems.filter((selectedElement) => selectedElement !== id);
		}

		this.setState({
			selectedElements: newSelectedItems
		});

		this.props.setValue('contacts', newSelectedItems);
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
						<Text style={{ fontSize: 15 }}>{this.state.selectedElements.length} seleccionados</Text>
					</View>
				</TouchableOpacity>

				<Portal>
					<Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
						<Dialog.Content>
							<TextInput onChangeText={this.filterEvents} placeholder="Buscar elementos" />
							<ScrollView style={{ maxHeight: height * 0.4 }}>
								{this.state.filteredElements.map((element) => (
									<TouchableOpacity onPress={() => this.onSelectElement(element.id)} key={element.id}>
										<View
											style={{
												paddingVertical: 10,
												paddingHorizontal: 7,
												flexDirection: 'row',
												justifyContent: 'space-between'
											}}
										>
											<Text style={{ fontSize: 17, lineHeight: 20, maxHeight: 20 }}>
												{element.name}
											</Text>
											{this.state.selectedElements.includes(element.id) && (
												<Icon type="ionicon" name="md-checkmark" color="blue" />
											)}
										</View>
									</TouchableOpacity>
								))}
							</ScrollView>
							<Button onPress={this._hideDialog}>Aceptar</Button>
						</Dialog.Content>
					</Dialog>
				</Portal>
			</View>
		);
	}
}

export default CustomMultiPicker;
