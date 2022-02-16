export interface WeatherData {
	dt: number;
	temp: number;
	type: string;
	desc: string;
	icon: string;
}

export interface CityForecast {
	index: number;
	current?: WeatherData;
	daily?: Array<WeatherData>;
}
