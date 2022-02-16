import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RefreshState {
	currentTimestamp: number;
	dailyTimestamp: number;
}

const initialState: RefreshState = {
	currentTimestamp: 0,
	dailyTimestamp: 0,
}

const refreshSlice = createSlice({
	name: 'refresh',
	initialState,
	reducers: {
		setCurrentTimestamp: (state, action: PayloadAction<number>) => {
			state.currentTimestamp = action.payload;
		},
		setDailyTimestamp: (state, action: PayloadAction<number>) => {
			state.dailyTimestamp = action.payload;
		},
	}
});

export const { setCurrentTimestamp, setDailyTimestamp } = refreshSlice.actions;
export default refreshSlice.reducer;