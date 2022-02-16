import * as React from 'react';
import { connect } from 'react-redux';
import './Weather.css';
import { RootState } from './app/store';
import { setTimestamp } from './Reducers/refresh';
import { setCityForecast, clearForecasts } from './Reducers/forecast';
import type { WeatherData, CityForecast } from './Types/forecast';
import type { CityData } from './Types/city';

import CityList from './Components/CityList';
import WeatherCard from './Components/WeatherCard';

interface WeatherProps {
	timestamp: number;
	setTimestamp: typeof setTimestamp;
	setCityForecast: typeof setCityForecast;
	clearForecasts: typeof clearForecasts;
}

class Weather extends React.Component<WeatherProps> {
	cities = [
		{name: 'Toronto', lat: 43.6534817, lon: -79.3839347},
		{name: 'Cape Town', lat: -33.928992, lon: 18.417396},
		{name: 'Seoul', lat: 37.5666791, lon: 126.9782914}
	];
	refreshInterval = 10;
	apiKey = process.env.REACT_APP_API_KEY;
	weatherAPI = process.env.REACT_APP_API;
	timerId: ReturnType<typeof setTimeout> | null = null;
	
	componentDidMount() {
		const diff = Date.now() - this.props.timestamp;
		if(diff > this.refreshInterval * 60 * 1000) {
			this.fetchWeatherData();
		} else {
			this.timerId = setTimeout(() => { this.fetchWeatherData() }, this.refreshInterval * 60 * 1000 - diff);
		}
	}
	
	componentDidUpdate(prevProps: WeatherProps, prevState: RootState) {
		if(this.timerId === null && this.props.timestamp) {
			this.timerId = setTimeout(() => { this.fetchWeatherData() }, this.refreshInterval * 60 * 1000);
		}
	}
	
	render() {
		return (
			<div className="Weather">
				<header className="Weather-header">
					<CityList cities={this.cities}/>
				</header>
				<main className="Weather-main">
					<WeatherCard element="div" forecastType="current"/>
					<ul id="forecast">
						<WeatherCard element="li" forecastType="daily" index={0}/>
						<WeatherCard element="li" forecastType="daily" index={1}/>
						<WeatherCard element="li" forecastType="daily" index={2}/>
						<WeatherCard element="li" forecastType="daily" index={3}/>
					</ul>
				</main>
			</div>
		);
	}
	
	componentWillUnmount() {
		if(this.timerId) clearTimeout(this.timerId);
	}
	
	fetchWeatherData() {
		this.props.clearForecasts();
		this.timerId = null;
		this.cities.forEach((city:CityData, index:number) => {
			fetch(`${this.weatherAPI}?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${this.apiKey}`)
				.then((result) => result.json())
				.then((data) => this.formatApiData(data, index))
				.catch((error) => {
					alert(`Can't fetch weather data for ${city.name} right now, sorry!`)
				});
		}, this);
		this.props.setTimestamp(Date.now());
	}
	
	formatApiData(data: any, index: number) {
		const forecast:CityForecast = {
			index: index,
			forecast: {
				current: {
					dt: data.current.dt+data.timezone_offset,
					temp: data.current.temp,
					type: data.current.weather[0].main,
					desc: data.current.weather[0].description,
					icon: data.current.weather[0].icon
				},
				daily: (function(daily) {
					let forecasts: Array<WeatherData> = [];
					// Tomorrow to +4 days
					for(let i=1;i<=4;i++) {
						forecasts.push({
							dt: data.daily[i].dt+data.timezone_offset as number,
							temp: data.daily[i].temp.day as number,
							type: data.daily[i].weather[0].main as string,
							desc: data.daily[i].weather[0].description as string,
							icon: data.daily[i].weather[0].icon as string
						});
					}
					return forecasts;
				})(),
			}
		};
		this.props.setCityForecast(forecast);
	}
}

export default connect((state: RootState) => ({timestamp: state.refresh.timestamp}), {setTimestamp, setCityForecast, clearForecasts})(Weather);
