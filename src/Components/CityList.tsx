import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../app/store';
import { setIndex } from '../Reducers/city';
import type { CityData } from '../Types/city';

interface CityListProps {
	cities: Array<CityData>;
	index: number;
	setIndex: typeof setIndex;
}

class CityList extends React.Component<CityListProps> {
	render() {
		return (
			<ul id="cities">
				<li className={"Weather-city "+(this.props.index == 0?'selected':'')} onClick={(e) => this.props.setIndex(0)}>
					{this.props.cities[0].name}
				</li>
				<li className={"Weather-city "+(this.props.index == 1?'selected':'')} onClick={(e) => this.props.setIndex(1)}>
					{this.props.cities[1].name}
				</li>
				<li className={"Weather-city "+(this.props.index == 2?'selected':'')} onClick={(e) => this.props.setIndex(2)}>
					{this.props.cities[2].name}
				</li>
			</ul>
		);
	}
}

export default connect((state: RootState) => ({index: state.city.index}), {setIndex})(CityList);