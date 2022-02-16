import * as React from 'react';
import { connect } from 'react-redux';
import './Weather.css';
import { RootState } from './app/store';
import { setCurrentTimestamp, setDailyTimestamp } from './Reducers/refresh';
import { setCityCurrentForecast, setCityDailyForecast } from './Reducers/forecast';
import type { WeatherData, CityForecast } from './Types/forecast';
import type { CityData } from './Types/city';

import CityList from './Components/CityList';
import WeatherCard from './Components/WeatherCard';

interface WeatherProps {
	currentTimestamp: number;
	dailyTimestamp: number;
	setCurrentTimestamp: typeof setCurrentTimestamp;
	setDailyTimestamp: typeof setDailyTimestamp;
	setCityCurrentForecast: typeof setCityCurrentForecast;
	setCityDailyForecast: typeof setCityDailyForecast;
}

class Weather extends React.Component<WeatherProps> {
	cities = [
		{name: 'Toronto', lat: 43.6534817, lon: -79.3839347},
		{name: 'Cape Town', lat: -33.928992, lon: 18.417396},
		{name: 'Seoul', lat: 37.5666791, lon: 126.9782914}
	];
	currentRefreshInterval = 10;
	dailyRefreshInterval = 720;
	apiKey = process.env.REACT_APP_API_KEY;
	weatherApiCurrent = process.env.REACT_APP_API_CURRENT;
	weatherApiDaily = process.env.REACT_APP_API_DAILY;
	currentTimerId: ReturnType<typeof setTimeout> | null = null;
	dailyTimerId: ReturnType<typeof setTimeout> | null = null;
	
	componentDidMount() {
		const currentDiff = Date.now() - this.props.currentTimestamp;
		const dailytDiff = Date.now() - this.props.dailyTimestamp;
		if(currentDiff > this.currentRefreshInterval * 60 * 1000) {
			this.fetchCurrentWeatherData();
		} else {
			this.currentTimerId = setTimeout(() => { this.fetchCurrentWeatherData() }, this.currentRefreshInterval * 60 * 1000 - currentDiff);
		}
		if(dailytDiff > this.dailyRefreshInterval * 60 * 1000) {
			this.fetchDailyWeatherData();
		} else {
			this.currentTimerId = setTimeout(() => { this.fetchDailyWeatherData() }, this.dailyRefreshInterval * 60 * 1000 - dailytDiff);
		}
	}
	
	componentDidUpdate(prevProps: WeatherProps, prevState: RootState) {
		if(this.currentTimerId === null && this.props.currentTimestamp) {
			this.currentTimerId = setTimeout(() => { this.fetchCurrentWeatherData() }, this.currentRefreshInterval * 60 * 1000);
		}
		if(this.dailyTimerId === null && this.props.dailyTimestamp) {
			this.dailyTimerId = setTimeout(() => { this.fetchDailyWeatherData() }, this.dailyRefreshInterval * 60 * 1000);
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
		if(this.currentTimerId) clearTimeout(this.currentTimerId);
		if(this.dailyTimerId) clearTimeout(this.dailyTimerId);
	}
	
	fetchCurrentWeatherData() {
		this.currentTimerId = null;
		this.cities.forEach((city:CityData, index:number) => {
			fetch(`${this.weatherApiCurrent}?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${this.apiKey}`)
				.then((result) => result.json())
				.then((data) => this.formatCurrentApiData(data, index));
		}, this);
		this.props.setCurrentTimestamp(Date.now());
	}
	
	fetchDailyWeatherData() {
		this.dailyTimerId = null;
		this.cities.forEach((city:CityData, index:number) => {
			/*fetch(`${this.weatherApiDaily}?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${this.apiKey}`)
				.then((result) => result.json())
				.then((data) => this.formatDailyApiData(data, index))
				.catch((error) => {
					alert(`Can't fetch daily weather data for ${city.name} right now, sorry!`)
				});*/
		}, this);
		this.props.setDailyTimestamp(Date.now());
	}
	
	formatCurrentApiData(data: any, index: number) {
		const forecast:CityForecast = {
			index: index,
			current: {
				dt: data.dt+data.timezone,
				temp: data.main.temp,
				type: data.weather[0].main,
				desc: data.weather[0].description,
				icon: data.weather[0].icon
			}
		};
		this.props.setCityCurrentForecast(forecast);
	}
	
	formatDailyApiData(data: any, index: number) {
		const forecast:CityForecast = {
			index: index,
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
		};
		this.props.setCityDailyForecast(forecast);
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		currentTimestamp: state.refresh.currentTimestamp,
		dailyTimestamp: state.refresh.dailyTimestamp
	};
}

export default connect(mapStateToProps, {setCurrentTimestamp, setDailyTimestamp, setCityCurrentForecast, setCityDailyForecast})(Weather);
