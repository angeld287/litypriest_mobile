import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = () => (
	<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<ActivityIndicator size="large" color="#302D58" />
	</View>
);

export default Spinner;
