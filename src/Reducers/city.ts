import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CityState {
	index: number;
}

const initialState: CityState = {
	index: 0,
}

const citySlice = createSlice({
	name: 'city',
	initialState,
	reducers: {
		setIndex: (state, action: PayloadAction<number>) => {
			state.index = action.payload;
		}
	}
});

export const { setIndex } = citySlice.actions;
export default citySlice.reducer;