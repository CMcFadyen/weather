import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import type { CityForecast } from '../Types/forecast';

const initialState = [
	{index: 0,
	current: undefined,
	daily: undefined},
	{index: 0,
	current: undefined,
	daily: undefined},
	{index: 0,
	current: undefined,
	daily: undefined},
] as Array<CityForecast>;

const forecastSlice = createSlice({
	name: 'forecast',
	initialState,
	reducers: {
		setCityCurrentForecast: (state, action: PayloadAction<CityForecast>) => {
			state[action.payload.index]['current'] = action.payload.current;
			return state;
		},
		setCityDailyForecast: (state, action: PayloadAction<CityForecast>) => {
			state[action.payload.index]['daily'] = action.payload.daily;
			return state;
		}
	}
});

export const selectCityForecast = (state: RootState) => ({forecast: state.forecast[state.city.index]});

export const { setCityCurrentForecast, setCityDailyForecast } = forecastSlice.actions;
export default forecastSlice.reducer;