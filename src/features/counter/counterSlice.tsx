import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
	value: 0,
	status: "idle",
};

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		increment(state) {
			state.value++;
		},
		decrement(state) {
			state.value--;
		},
		incrementByAmount(state, action: PayloadAction<number>) {
			state.value += action.payload;
		},
	},
});

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export const selectCount = (state: any) => state.counter.value;

export default counterSlice.reducer;