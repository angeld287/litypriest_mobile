import React from 'react';

import { Icon } from 'react-native-elements';

import { View, TouchableOpacity, PushNotificationIOS, Alert } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import SignInScreen from '../screens/Authentication/SignInScreen';
//import SettingsScreen from '../screens/Profile/SettingsScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen';
import DiaryNavigation from './DiaryNagivation';
import ProfileContainer from '../screens/Profile/ProfileContainer';

// Configurations and options for the AppTabNavigator
const configurations = {
	Agenda: {
		screen: DiaryNavigation,
		navigationOptions: {
			//tabBarLabel: 'Home',
			tabBarIcon: ({ tintColor }) => (
				<Icon iconStyle={{ fontSize: 26 }} name="ios-home" type="ionicon" color="#fff" />
			)
		}
	},
	Calendario: {
		screen: ProfileScreen,
		navigationOptions: {
			tabBarLabel: 'Consultas',
			tabBarIcon: ({ tintColor }) => (
				<Icon iconStyle={{ fontSize: 26 }} name="ios-list" type="ionicon" color="#fff" />
			)
		}
	},
	Perfil: {
		screen: ProfileContainer,
		navigationOptions: {
			//tabBarLabel: 'Settings',
			tabBarIcon: ({ tintColor }) => (
				<Icon iconStyle={{ fontSize: 26 }} name="ios-settings" type="ionicon" color="#fff" />
			)
		}
	}
};

const options = {
	swipeEnabled: true,
	animationEnabled: true,
	navigationOptions: {
		tabBarVisible: true
	},
	tabBarOptions: {
		showLabel: true,
		activeTintColor: '#fff',
		inactiveTintColor: '#fff9',
		style: {
			backgroundColor: '#3F51B5'
		},
		labelStyle: {
			fontSize: 12,
			fontWeight: 'bold',
			marginBottom: 12,
			marginTop: 12
		},
		indicatorStyle: {
			height: 0
		},
		showIcon: true
	}
};

// Bottom App tabs
const AppTabNavigator = createMaterialBottomTabNavigator(configurations, options);

// Making the common header title dynamic in AppTabNavigator
AppTabNavigator.navigationOptions = ({ navigation }) => {
	let { routeName } = navigation.state.routes[navigation.state.index];
	let headerTitle = routeName;
	return {
		headerTitle
	};
};

const AppStackNavigator = createStackNavigator({
	Header: {
		screen: AppTabNavigator,
		// Set the header icon
		navigationOptions: ({ navigation }) => ({
			headerLeft: (
				<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
					<View style={{ paddingHorizontal: 10 }} />
				</TouchableOpacity>
			)
		})
	}
});

// App stack for the drawer
export const AppDrawerNavigator = createDrawerNavigator({
	Tabs: AppStackNavigator,
	Agenda: ProfileScreen,
	Calendario: ProfileScreen,
	Perfil: ProfileScreen
});

// Auth stack
export const AuthStackNavigator = createStackNavigator({
	Welcome: {
		screen: SignInScreen,
		navigationOptions: () => ({
			//title: `Log in to your account`, // for the header screen
			header: null,
			headerBackTitle: 'Back'
		})
	},
	SignIn: {
		screen: SignInScreen,
		navigationOptions: () => ({
			header: null
			//title: `Log in to your account`,
		})
	}
});
