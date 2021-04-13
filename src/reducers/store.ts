import {configureStore} from "@reduxjs/toolkit";
import reducers from "./todo/state";

export const store = configureStore({
	preloadedState: {},
	reducer: {
		todos: reducers,
	},
});