import { configureStore } from '@reduxjs/toolkit';
import cityReducer from '../Reducers/city';
import forecastReducer from '../Reducers/forecast';
import refreshReducer from '../Reducers/refresh';
import { loadState, saveState } from './localStorage';

export const store = configureStore({
	reducer: {
		city: cityReducer,
		forecast: forecastReducer,
		refresh: refreshReducer,
	},
	preloadedState: (function() {
		let oldState = loadState();
		if(oldState.timestamp) return undefined;
		return oldState;
	})()
});

store.subscribe(() => {
	const state = store.getState();
	saveState({
		forecast: state.forecast,
		refresh: state.refresh
	});
});

export type RootState = ReturnType<typeof store.getState>;
