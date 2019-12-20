import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import SettingsScreen from './ProfileScreen';
import { Auth } from 'aws-amplify';

export class ProfileContainer extends Component {
	state = {
		user: {},
		loading: true
	};

	signOutAlert = async () => {
		await Alert.alert(
			'Cerrar Sesion',
			'Estas seguro(a) que deseas Cerrar Sesion?',
			[
				{ text: 'Cancelar', onPress: () => console.log('Canceled'), style: 'cancel' },
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

	componentDidMount = () => {
		Auth.currentAuthenticatedUser().then((data) => {
			this.setState({
				user: {
					username: data.username,
					email: data.attributes.email,
					phone: data.attributes.phone_number
				},
				loading: false
			});
		});
	};

	render() {
		if (this.state.loading) return <Text>Cargando</Text>;
		return <SettingsScreen currentUser={this.state.user} signOutAlert={this.signOutAlert} />;
	}
}

export default ProfileContainer;
