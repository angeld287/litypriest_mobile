//import PushNotification from 'react-native-push-notification';
import { YellowBox } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// Amplify imports and config
import Amplify from 'aws-amplify';

import AuthLoadingScreen from './src/components/screens/Authentication/AuthLoadingScreen';
import { AppDrawerNavigator, AuthStackNavigator, AppTabNavigator } from './src/components/navigation';
import config from './src/aws-exports';

import { LocaleConfig } from 'react-native-calendars';
import SignInScreen from './src/components/screens/Authentication/SignInScreen';

LocaleConfig.locales['es'] = {
	monthNames: [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre'
	],
	monthNamesShort: [ 'Ene.', 'Febr.', 'Mar.', 'Abr.', 'May', 'Jun', 'Jul.', 'Ago', 'Sept.', 'Oct.', 'Nov.', 'Dic.' ],
	dayNames: [ 'Doming', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
	dayNamesShort: [ 'Dom.', 'Lun.', 'Mar.', 'Mier.', 'Jue.', 'Vie.', 'Sab.' ],
	today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

Amplify.configure(config);
YellowBox.ignoreWarnings([ 'Require cycle' ]);

const App = createAppContainer(
	createSwitchNavigator({
		Authloading: AuthLoadingScreen,
		Auth: {
			screen: SignInScreen,
			navigationOptions: () => ({
				header: null
			})
		}, // the Auth stack
		App: AppTabNavigator // the App stack
	})
);

export default App;
