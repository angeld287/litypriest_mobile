import React, { PureComponent } from 'react';
import Diary from './Diary';

const data = [
	{
		id: 'd6dc2b93-7a22-4f2f-91cd-a8d3dc8e0538',
		name: 'bautizo de niños'
	},
	{
		id: '2',
		name: 'prueba'
	}
];

class DiaryContainer extends PureComponent {
	render() {
		return <Diary events={data} />;
	}
}

export default DiaryContainer;
