import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RefreshState {
	timestamp: number;
}

const initialState: RefreshState = {
	timestamp: 0,
}

const refreshSlice = createSlice({
	name: 'refresh',
	initialState,
	reducers: {
		setTimestamp: (state, action: PayloadAction<number>) => {
			state.timestamp = action.payload;
		}
	}
});

export const { setTimestamp } = refreshSlice.actions;
export default refreshSlice.reducer;