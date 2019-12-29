import { createStackNavigator } from 'react-navigation-stack';
import DiaryContainer from '../screens/Diary/DiaryContainer';
import EventContainer from '../screens/Event/EventContainer';
import EditEventContainer from '../screens/Event/EditEventContainer';
import DayContainer from '../screens/Diary/DayContainer';
import NewEventContainer from '../screens/Event/NewEventContainer';

const DiaryNavigation = createStackNavigator(
	{
		Home: {
			screen: DiaryContainer
		},
		Event: {
			screen: EventContainer
		},
		NewEvent: {
			screen: NewEventContainer
		},
		EditEvent: {
			screen: EditEventContainer
		},
		Day: {
			screen: DayContainer
		}
	},
	{
		headerMode: 'none'
	}
);

export default DiaryNavigation;
