import React from 'react';

import { Icon } from 'react-native-elements';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import SignInScreen from '../screens/Authentication/SignInScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import DiaryNavigation from './DiaryNagivation';
import ProfileContainer from '../screens/Profile/ProfileContainer';
import SearchContainer from '../screens/Search/SearchContainer';

// Configurations and options for the AppTabNavigator
const configurations = {
	Calendario: {
		screen: DiaryNavigation,
		navigationOptions: {
			//tabBarLabel: 'Home',
			tabBarIcon: ({ tintColor }) => (
				<Icon iconStyle={{ fontSize: 26 }} name="md-calendar" type="ionicon" color={tintColor} />
			)
		}
	},
	Buscar: {
		screen: SearchContainer,
		navigationOptions: {
			tabBarLabel: 'Consultas',
			tabBarIcon: ({ tintColor }) => (
				<Icon iconStyle={{ fontSize: 26 }} name="md-search" type="ionicon" color={tintColor} />
			)
		}
	},
	Perfil: {
		screen: ProfileContainer,
		navigationOptions: {
			//tabBarLabel: 'Settings',
			tabBarIcon: ({ tintColor }) => (
				<Icon iconStyle={{ fontSize: 26 }} name="md-settings" type="ionicon" color={tintColor} />
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
export const AppTabNavigator = createMaterialBottomTabNavigator(configurations, {
	swipeEnabled: true,
	animationEnabled: true,
	shifting: true,
	barStyle: {
		backgroundColor: 'white'
	},
	activeColor: 'blue'
});
