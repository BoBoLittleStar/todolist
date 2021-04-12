import {createAction, createReducer} from "@reduxjs/toolkit";
import {randId} from "../../config/config";
import {initialState, State} from "./types";

const add = createAction<string>("add");
const edit = createAction<{ id: string, task: string }>("edit");
const tick = createAction<string>("tick");
const tickAll = createAction("tickAll");
const remove = createAction<string>("remove");
const removeChecked = createAction("removeChecked");

export const actions = {add, edit, tick, tickAll, remove, removeChecked};
const reducers = createReducer(initialState, builder => {
	builder.addCase(add, (state, action) => {
		const id = randId();
		state.ids.push(id);
		state.count++;
		state.items[id] = {task: action.payload, checked: false};
	}).addCase(edit, (state, action) => {
		const item = state.items[action.payload.id];
		item.task !== action.payload.task && (item.task = action.payload.task);
	}).addCase(tick, (state, action) => {
		const item = state.items[action.payload];
		item.checked = !item.checked;
		item.checked ? state.count-- : state.count++;
	}).addCase(tickAll, (state) => {
		const tick = state.count > 0;
		state.count = tick ? 0 : state.ids.length;
		state.ids.forEach(id => state.items[id].checked = tick);
	}).addCase(remove, (state, action) => {
		for (let i = 0, len = state.ids.length; i < len; i++)
			if (state.ids[i] === action.payload) {
				const item = state.items[state.ids[i]];
				!item.checked && state.count--;
				delete state.items[state.ids[i]];
				state.ids.splice(i, 1);
				break;
			}
	}).addCase(removeChecked, (state) => {
		state.count < state.ids.length && (state.ids = state.ids.filter(id => {
			const del = state.items[id].checked;
			del && delete state.items[id];
			return !del;
		}));
	});
});
export const selector = (state: { todos: State }) => state.todos;

export default reducers;