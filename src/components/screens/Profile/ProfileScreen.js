import React, { Fragment } from 'react';
import {
	TouchableOpacity,
	TouchableWithoutFeedback,
	StyleSheet,
	Text,
	SafeAreaView,
	StatusBar,
	KeyboardAvoidingView,
	Keyboard,
	View,
	Alert,
	ScrollView,
	FlatList,
	Divider
} from 'react-native';

import { Item, Input } from 'native-base';

import GLOBAL from '../../global/global.js';

import { ListItem, Button } from 'react-native-elements';

// AWS Amplify modular import
import Auth from '@aws-amplify/auth';
import { container } from '@aws-amplify/ui';

export default class SettingsScreen extends React.Component {
	state = {
		password1: '',
		password2: '',
		isModalVisible: false,
		changingPassword: false,
		error: false,
		username: GLOBAL.USERNAME,
		phone: GLOBAL.PHONE,
		email: GLOBAL.EMAIL,
		name: GLOBAL.NAME
	};
	onChangeText(key, value) {
		this.setState({
			[key]: value
		});
	}

	_Dialog = () => this.setState({ isModalVisible: !this.state.isModalVisible });

	// Sign out from the app
	signOutAlert = async () => {
		await Alert.alert(
			'Cerrar Sesion',
			'Estas seguro(a) que deseas Cerrar Sesion?',
			[
				{ text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel' },
				{ text: 'OK', onPress: () => this.signOut() }
			],
			{ cancelable: false }
		);
	};

	signOut = async () => {
		await Auth.signOut()
			.then(() => {
				console.log('Sign out complete');
				this.props.navigation.navigate('Authloading');
			})
			.catch((err) => console.log('Error while signing out!', err));
	};

	keyExtractor = (item, index) => index.toString();

	renderItem = ({ item }) => (
		<ListItem title={item.name} rightIcon={{ name: 'arrow-forward' }} onPress={item.action} />
	);

	renderItemUserData = ({ item }) => <ListItem title={item.title} leftIcon={{ name: item.icon }} />;

	render() {
		const { username, name, phone, email, changingPassword, error } = this.state;
		const acctions_list = [ { name: 'Cerrar Sesion', action: this.signOutAlert } ];

		const user_data_list = [
			{ title: username, icon: 'person' },
			{ title: name, icon: 'person' },
			{ title: email, icon: 'mail' },
			{ title: phone, icon: 'call' }
		];

		const empty_list = [
			{ title: '', icon: '' },
			{ title: '', icon: '' },
			{ title: '', icon: '' },
			{ title: '', icon: '' },
			{ title: '', icon: '' },
			{ title: '', icon: '' }
		];

		return (
			<Fragment>
				<FlatList
					style={{ marginTop: 20 }}
					keyExtractor={this.keyExtractor}
					data={user_data_list}
					renderItem={this.renderItemUserData}
				/>

				<FlatList
					style={{ marginTop: 20 }}
					keyExtractor={this.keyExtractor}
					data={acctions_list}
					renderItem={this.renderItem}
				/>
				<FlatList
					style={{ marginTop: 20 }}
					keyExtractor={this.keyExtractor}
					data={empty_list}
					renderItem={this.renderItemUserData}
				/>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	itemStyle: {
		marginTop: 20,
		marginBottom: 20
	}
});
