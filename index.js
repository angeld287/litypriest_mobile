/**
 * @format
*/

import * as React from 'react';
import { AppRegistry, YellowBox, StatusBar, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './App';

import { name as appName } from './app.json';
import ErrorBoundary from './src/components/screens/ErrorBoundary';

YellowBox.ignoreWarnings([ 'Require cycle' ]);
class Main extends React.Component {
	render() {
		return (
			<PaperProvider>
				<View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
					<StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
					<App />
				</View>
			</PaperProvider>
		);
	}
}

AppRegistry.registerComponent(appName, () => Main);
