import * as React from 'react';
import { connect } from 'react-redux';
import './Weather.css';
import { RootState } from './app/store';
import { setTimestamp } from './Reducers/refresh';
import { setCityForecast, clearForecasts } from './Reducers/forecast';
import type { Forecast, CityForecast } from './Types/forecast';
import type { CityData } from './Types/city';

import CityList from './Components/CityList';
import WeatherCard from './Components/WeatherCard';

interface WeatherProps {
	timestamp: number;
	forecastData: Array<Forecast>;
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
	refreshInterval = 30;
	apiKey = process.env.REACT_APP_API_KEY;
	weatherAPI = process.env.REACT_APP_API;
	timerId: ReturnType<typeof setTimeout> | null = null;
	
	componentDidMount() {
		const diff = Date.now() - this.props.timestamp;
		console.log(diff/60/1000);
		if(diff > this.refreshInterval * 60 * 1000 || !this.props.forecastData || this.props.forecastData.length == 0) {
			this.fetchWeatherData();
		} else {
			this.timerId = setTimeout(() => { this.fetchWeatherData() }, this.refreshInterval * 60 * 1000 - diff);
		}
	}
	
	componentDidUpdate(prevProps: WeatherProps, prevState: RootState) {
		if(this.timerId === null && this.props.timestamp) {
			this.timerId = setTimeout(() => { this.fetchWeatherData() }, this.refreshInterval * 60 * 1000 - this.props.timestamp);
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
	
	fetchWeatherData() {
		this.props.clearForecasts();
		this.timerId = null;
		this.cities.forEach((city:CityData, index:number) => {
			fetch(`${this.weatherAPI}?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${this.apiKey}`)
				.then((result) => result.json())
				.then((data) => this.formatApiData(data, index));
		}, this);
		this.props.setTimestamp(Date.now());
	}
	
	formatApiData(data: any, index: number) {
		console.log(data);
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
				daily: [{
					dt: data.daily[1].dt+data.timezone_offset,
					temp: data.daily[1].temp.day,
					type: data.daily[1].weather[0].main,
					desc: data.daily[1].weather[0].description,
					icon: data.daily[1].weather[0].icon
				},{
					dt: data.daily[2].dt+data.timezone_offset,
					temp: data.daily[2].temp.day,
					type: data.daily[2].weather[0].main,
					desc: data.daily[2].weather[0].description,
					icon: data.daily[2].weather[0].icon
				},{
					dt: data.daily[3].dt+data.timezone_offset,
					temp: data.daily[3].temp.day,
					type: data.daily[3].weather[0].main,
					desc: data.daily[3].weather[0].description,
					icon: data.daily[3].weather[0].icon
				},{
					dt: data.daily[4].dt+data.timezone_offset,
					temp: data.daily[4].temp.day,
					type: data.daily[4].weather[0].main,
					desc: data.daily[4].weather[0].description,
					icon: data.daily[4].weather[0].icon
				}]
			}
		};
		this.props.setCityForecast(forecast);
	}
}

export default connect((state: RootState) => ({timestamp: state.refresh.timestamp, forecastData: state.forecast}), {setTimestamp, setCityForecast, clearForecasts})(Weather);
