import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { ListItem } from 'react-native-elements';

const SettingsScreen = ({ currentUser, signOutAlert }) => {
	const user_data_list = [
		{ title: currentUser.username, icon: 'person' },
		{ title: currentUser.email, icon: 'mail' },
		{ title: currentUser.phone, icon: 'call' }
	];
	const actions_list = [ { name: 'Cerrar Sesion', action: signOutAlert, icon: 'arrow-forward' } ];

	return (
		<Fragment>
			<View style={styles.itemStyle}>
				{user_data_list.map((item, index) => (
					<ListItem key={index} title={item.title} leftIcon={{ name: item.icon }} />
				))}
			</View>

			<View style={styles.itemStyle}>
				{actions_list.map((item, index) => (
					<ListItem key={index} title={item.name} rightIcon={{ name: item.icon }} onPress={item.action} />
				))}
			</View>
		</Fragment>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({
	itemStyle: {
		marginTop: 20,
		marginBottom: 20
	}
});
