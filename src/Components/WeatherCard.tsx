import * as React from 'react';
import { connect } from 'react-redux';
import { selectCityForecast } from '../Reducers/forecast';
import type { WeatherData, CityForecast } from '../Types/forecast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconLookup } from '../Types/iconlookup';

interface WeatherCardProps {
	forecast: CityForecast;
	forecastType: 'daily' | 'current';
	element?: string;
	index?: number;
}

class WeatherCard extends React.Component<WeatherCardProps> {
	CardTag:string = `${this.props.element}`;
	attributes:any = (this.props.forecastType === 'current')?{id: 'today'}:{};
	
	render() {
		let data:WeatherData;
		
		if(this.props.forecast) {
			if(this.props.forecastType === 'current' && this.props.forecast.current) {
				return this.fullCard('Today', this.props.forecast.current);
			} else if(this.props.forecastType === 'daily' && this.props.forecast.daily && this.props.forecast.daily.length) {
				data = this.props.forecast.daily[this.props.index as number];
				const idt = new Intl.DateTimeFormat('en', {weekday: 'short'});
				const day = idt.format(new Date(data.dt*1000));
				return this.fullCard(day, data);
			} else {
				return this.emptyCard();
			}
		} else {
			return this.emptyCard();
		}
	}
	
	fullCard(day: string, data: WeatherData) {
		return (
			<this.CardTag className="Weather-card" {...this.attributes}>
				<div className="Weather-card-title">{day}</div>
				<div className="Weather-card-data">
					<div className="Weather-card-left" title={data.desc}>
						<div className="icon-wrapper"><FontAwesomeIcon icon={IconLookup[data.icon]} /></div>
					</div>
					<div className="Weather-card-right">
						<div className="Weather-card-temperature">{Math.round(data.temp)}°</div>
						<div className="Weather-card-type" title={data.desc}>{data.type}</div>
					</div>
				</div>
			</this.CardTag>
		);
	}
	
	emptyCard() {
		return (
			<this.CardTag className="Weather-card" {...this.attributes}>
				<div className="Weather-card-title">Loading...</div>
				<div className="Weather-card-data">
					<div className="Weather-card-left lds-ripple">
						<div className="icon-wrapper"></div>
					</div>
					<div id="Weather-card-right">
						<div className="Weather-card-temperature"></div>
						<div className="Weather-card-type"></div>
					</div>
				</div>
			</this.CardTag>
		);
	}
}

export default connect(selectCityForecast)(WeatherCard);
