import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

// AWS Amplify modular import
import Auth from '@aws-amplify/auth';

export default class AuthLoadingScreen extends React.Component {
	state = {
		userToken: null
	};
	componentDidMount() {
		this.loadApp();
	}
	// Get the logged in users and remember them
	loadApp = () => {
		// Auth.currentSession().then((x) => console.log(x)).catch((y) => console.log(y));
		Auth.currentAuthenticatedUser()
			.then((user) => {
				GLOBAL.PHONE = user.attributes.phone_number;
				GLOBAL.EMAIL = user.attributes.email;
				GLOBAL.NAME = user.username;
				GLOBAL.USERNAME = user.signInUserSession.accessToken.payload.username;
				GLOBAL.USER_ROLL = user.signInUserSession.accessToken.payload['cognito:groups'][0];
				this.setState({ userToken: user.signInUserSession.accessToken.jwtToken });
			})
			.catch((err) => console.log(err))
			.finally(() => {
				this.props.navigation.navigate(this.state.userToken ? 'App' : 'Auth');
			});
	};
	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#302D58" />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
