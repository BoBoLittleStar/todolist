import {createReducer} from "@reduxjs/toolkit";
import {actions} from "../request";
import {initialState, State} from "./types";

const reducers = createReducer(initialState, builder => {
	builder.addCase(actions.load.fulfilled, (state, action) => {
		return action.payload;
	}).addCase(actions.add.fulfilled, (state, action) => {
		state.ids.push(action.payload.id);
		state.count++;
		state.items[action.payload.id] = {task: action.payload.task, checked: action.payload.checked};
	}).addCase(actions.edit.fulfilled, (state, action) => {
		const item = state.items[action.payload.id];
		item.task !== action.payload.task && (item.task = action.payload.task);
	}).addCase(actions.tick.fulfilled, (state, action) => {
		const item = state.items[action.payload.id];
		item.checked = !item.checked;
		item.checked ? state.count-- : state.count++;
	}).addCase(actions.tickAll.fulfilled, (state, action) => {
		state.count = action.payload ? 0 : state.ids.length;
		state.ids.forEach(id => state.items[id].checked = action.payload);
	}).addCase(actions.remove.fulfilled, (state, action) => {
		for (let i = 0, len = state.ids.length; i < len; i++)
			if (state.ids[i] === action.payload) {
				const item = state.items[state.ids[i]];
				!item.checked && state.count--;
				delete state.items[state.ids[i]];
				state.ids.splice(i, 1);
				break;
			}
	}).addCase(actions.removeChecked.fulfilled, (state) => {
		state.count < state.ids.length && (state.ids = state.ids.filter(id => {
			const del = state.items[id].checked;
			del && delete state.items[id];
			return !del;
		}));
	});
});
export const selector = (state: { todos: State }) => state.todos;

export default reducers;