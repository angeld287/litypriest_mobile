import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import { Icon } from 'react-native-elements';

export default class FloattingButtons extends React.Component {
	state = {
		open: false
	};

	renderIcon = (iconName) => <Icon iconStyle={{ fontSize: 26 }} name={iconName} type="ionicon" color="#000" />;

	render() {
		const { fab } = this.props;

		return (
			<Provider>
				<Portal>
					<FAB.Group
						open={this.state.open}
						icon={() => this.renderIcon(fab.fabIcon)}
						actions={fab.actions.map((action) => ({
							icon: () => this.renderIcon(action.icon),
							label: action.label,
							onPress: action.onPress
						}))}
						onStateChange={({ open }) => this.setState({ open })}
					/>
				</Portal>
			</Provider>
		);
	}
}
