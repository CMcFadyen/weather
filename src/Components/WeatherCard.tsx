import * as React from 'react';
import { connect } from 'react-redux';
import { selectCityForecast } from '../Reducers/forecast';
import type { WeatherData, Forecast } from '../Types/forecast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconLookup } from '../Types/iconlookup';

interface WeatherCardProps {
	forecast: Forecast;
	forecastType: 'daily' | 'current';
	element?: string;
	index?: number;
}

class WeatherCard extends React.Component<WeatherCardProps> {
	render() {
		let data:WeatherData;
		const CardTag:string = `${this.props.element}`;
		const attributes:any = (this.props.forecastType === 'current')?{id: 'today'}:{};
		
		if(this.props.forecast) {
			if(this.props.forecastType === 'current') {
				data = this.props.forecast.current;
			} else {
				data = this.props.forecast.daily[this.props.index as number];
			}
			
			let day:string = 'Today';
			if(this.props.forecastType !== 'current') {
				const idt = new Intl.DateTimeFormat('en', {weekday: 'short'});
				day = idt.format(new Date(data.dt*1000));
			}
			
			return (
				<CardTag className="Weather-card" {...attributes}>
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
				</CardTag>
			);
		} else {
			return (
				<CardTag className="Weather-card" {...attributes}>
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
				</CardTag>
			);
		}
	}
}

export default connect(selectCityForecast)(WeatherCard);
