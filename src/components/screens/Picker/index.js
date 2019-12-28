import React, { Component } from 'react';
import { Text, View, Platform, Picker, TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

class CustomPicker extends Component {
	state = {
		visible: false
	};

	_showDialog = () => this.setState({ visible: true });

	_hideDialog = () => this.setState({ visible: false });

	onChangeValue = (id) => {
		this.props.setEvent({
			...this.props.event,
			[this.props.propertyName]: id
		});
		this.props.setValue(this.props.propertyName, id);
		this._hideDialog();
	};

	render() {
		if (Platform.OS === 'android') {
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
								{
									this.props.elements.find(
										(element) => element.id === this.props.event[this.props.propertyName]
									).name
								}
							</Text>
						</View>
					</TouchableOpacity>

					<Portal>
						<Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
							<Dialog.Content>
								{this.props.elements.map((element) => (
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
		}

		return (
			<Picker
				selectedValue={this.props.selectedValue}
				onValueChange={(itemValue) => {
					this.props.setEvent({
						...this.props.event,
						category: itemValue
					});
					this.props.setValue('category', itemValue);
				}}
			>
				{this.props.elements.map((category) => (
					<Picker.Item key={category.id} label={category.name} value={category.id} />
				))}
			</Picker>
		);
	}
}

export default CustomPicker;
