import { createStackNavigator } from 'react-navigation-stack';
import DiaryContainer from '../screens/Diary/DiaryContainer';
import EventContainer from '../screens/Event/EventContainer';
import EditEventContainer from '../screens/Event/EditEventContainer';

const DiaryNavigation = createStackNavigator(
	{
		Home: {
			screen: DiaryContainer
		},
		Event: {
			screen: EventContainer
		},
		EditEvent: {
			screen: EditEventContainer
		}
	},
	{
		headerMode: 'none'
	}
);

export default DiaryNavigation;
