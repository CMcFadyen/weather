export interface WeatherData {
	dt: number;
	temp: number;
	type: string;
	desc: string;
	icon: string;
}

export interface Forecast {
	current: WeatherData;
	daily: Array<WeatherData>;
}

export interface CityForecast {
	index: number;
	forecast: Forecast;
}
