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
	preloadedState: loadState()
});

store.subscribe(() => {
	const state = store.getState();
	saveState({
		forecast: state.forecast,
		refresh: state.refresh
	});
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
