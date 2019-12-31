import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Animated, Alert, ScrollView } from 'react-native';

import GLOBAL from '../../global/global.js';

import { Button } from 'react-native-elements';

// AWS Amplify modular import
import Auth from '@aws-amplify/auth';

export default class SignInScreen extends React.Component {
	state = {
		username: '',
		password: '',
		fadeIn: new Animated.Value(0),
		fadeOut: new Animated.Value(0),
		isHidden: false,
		loading: false
	};

	handleRoute = async (destination) => {
		await this.props.navigation.navigate(destination);
	};

	onChangeText(key, value) {
		this.setState({
			[key]: value
		});
	}
	// Sign in users with Auth
	signIn() {
		this._starLoading();
		const { username, password } = this.state;
		Auth.signIn(username, password)
			.then((user) => {
				GLOBAL.PHONE = user.attributes.phone_number;
				GLOBAL.EMAIL = user.attributes.email;
				GLOBAL.NAME = user.attributes.name;
				Auth.currentAuthenticatedUser()
					.then((data) => {
						GLOBAL.USERNAME = data.signInUserSession.accessToken.payload.username;
						GLOBAL.USER_ROLL = data.signInUserSession.accessToken.payload['cognito:groups'][0];
						this._stopLoading();
						this.props.navigation.navigate('Authloading');
					})
					.catch((err) => {
						//console.log('There was an error: ' + err);
						this._stopLoading();
					});
			})
			.catch((err) => {
				if (!err.message) {
					//console.log('Error de incio de sesion: ', err);
					Alert.alert('Error de incio de sesion: ', err);
				} else {
					//console.log('Error de incio de sesion: ', err.message);
					Alert.alert('Error de incio de sesion: ', err.message);
				}
				this._stopLoading();
			});
	}

	_starLoading = () => this.setState({ loading: true });
	_stopLoading = () => this.setState({ loading: false });

	render() {
		const { loading } = this.state;
		return (
			<ScrollView>
				<View style={styles.container_}>
					<View style={styles.logoContiner} />
					<View style={styles.container}>
						{/* <Text style={styles.welcome}>WELCOME</Text> */}
						<View style={{ height: 30 }} />

						<View style={styles.emailContainer}>
							<TextInput
								style={styles.textInput}
								placeholder="Email"
								keyboardType="email-address"
								onChangeText={(value) => this.onChangeText('username', value)}
							/>
						</View>
						<View style={styles.passwordContainer}>
							<TextInput
								style={styles.textInput}
								placeholder="Password"
								secureTextEntry={true}
								onChangeText={(value) => this.onChangeText('password', value)}
							/>
						</View>

						<View style={{ height: 60 }} />
						<TouchableOpacity>
							<Button
								containerStyle={{ width: 300 }}
								onPress={() => this.signIn()}
								title="Iniciar Sesion"
								loading={loading}
							/>
						</TouchableOpacity>
						<View style={{ height: 30 }} />
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container_: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flex: 1,
		paddingTop: 50
	},
	logo: {
		width: 300,
		height: 60,
		resizeMode: 'contain'
	},
	forgotPassword: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		height: 30,
		alignItems: 'flex-end'
	},
	createAccount: {
		height: 30
	},
	normalContainer: {
		height: 20
	},
	normalText: {
		color: '#5B5A5A',
		fontSize: 12,
		alignItems: 'center',
		textAlign: 'center',
		width: 330
	},
	createText: {
		color: '#FF7260',
		fontSize: 12,
		alignItems: 'center',
		textAlign: 'center',
		width: 330
	},
	forgotText: {
		color: '#5B5A5A',
		fontSize: 12,
		alignItems: 'flex-end',
		textAlign: 'right',
		width: 330
	},
	logoContiner: {
		height: 170,
		flexDirection: 'column',
		justifyContent: 'flex-end'
	},
	welcome: {
		fontSize: 25,
		color: '#5B5A5A',
		letterSpacing: 6
	},
	textInput: {
		color: '#989899',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 14
	},
	button: {
		width: 325,
		borderColor: '#129793',
		borderWidth: 1,
		height: 50,
		padding: 10,
		borderRadius: 24,
		marginTop: 20,
		backgroundColor: '#129793',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#129793',
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowRadius: 5,
		shadowOpacity: 0.8
	},
	buttonText: {
		color: 'white',
		fontSize: 12
	},
	emailContainer: {
		width: 325,
		borderColor: '#CFD0D1',
		borderWidth: 1,
		height: 60,
		padding: 10,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderBottomWidth: 0,
		backgroundColor: '#F5F6F7'
	},
	passwordContainer: {
		width: 325,
		borderColor: '#CFD0D1',
		borderWidth: 1,
		height: 60,
		padding: 10,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4,
		backgroundColor: '#F5F6F7'
	}
});
