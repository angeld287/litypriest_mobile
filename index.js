/**
 * @format
*/

import * as React from 'react';
import { AppRegistry, YellowBox } from 'react-native';
import App from './App';

import { name as appName } from './app.json';
import ErrorBoundary from './src/components/screens/ErrorBoundary';

YellowBox.ignoreWarnings([ 'Require cycle' ]);
class Main extends React.Component {
	render() {
		return (
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		);
	}
}

AppRegistry.registerComponent(appName, () => Main);
