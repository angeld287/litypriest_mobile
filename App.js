//import PushNotification from 'react-native-push-notification';
import { YellowBox } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// Amplify imports and config
import Amplify from 'aws-amplify';

import AuthLoadingScreen from './src/components/screens/Authentication/AuthLoadingScreen';
import { AppDrawerNavigator, AuthStackNavigator } from './src/components/navigation';
import config from './src/aws-exports';

Amplify.configure(config);
YellowBox.ignoreWarnings([ 'Require cycle' ]);

const App = createAppContainer(
	createSwitchNavigator({
		Authloading: AuthLoadingScreen,
		Auth: AuthStackNavigator, // the Auth stack
		App: AppDrawerNavigator // the App stack
	})
);

export default App;
