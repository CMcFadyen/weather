import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import type { Forecast, CityForecast } from '../Types/forecast';

const initialState = [] as Array<Forecast>;

const forecastSlice = createSlice({
	name: 'forecast',
	initialState,
	reducers: {
		setCityForecast: (state, action: PayloadAction<CityForecast>) => {
			state[action.payload.index] = action.payload.forecast;
			return state;
		},
		clearForecasts: (state) => {
			state = [];
			return state;
		}
	}
});

export const selectCityForecast = (state: RootState) => ({forecast: state.forecast[state.city.index]});

export const { setCityForecast, clearForecasts } = forecastSlice.actions;
export default forecastSlice.reducer;