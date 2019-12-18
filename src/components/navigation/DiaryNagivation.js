import { createStackNavigator } from 'react-navigation-stack';
import DiaryContainer from '../screens/Diary/DiaryContainer';
import EventContainer from '../screens/Event/EventContainer';

const DiaryNavigation = createStackNavigator(
	{
		Home: {
			screen: DiaryContainer
		},
		Event: {
			screen: EventContainer
		}
	},
	{
		headerMode: 'none'
	}
);

export default DiaryNavigation;
