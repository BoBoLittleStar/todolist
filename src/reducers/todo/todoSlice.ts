import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4} from "uuid";
import {initialState, State} from "./types";

const _slice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		add(state, action: PayloadAction<string>) {
			const id = v4();
			state.ids.push(id);
			state.count++;
			state.items[id] = {task: action.payload, checked: false};
		},
		edit(state, action: PayloadAction<{ id: string, task: string }>) {
			const item = state.items[action.payload.id];
			item.task !== action.payload.task && (item.task = action.payload.task);
		},
		tick(state, action: PayloadAction<string>) {
			const item = state.items[action.payload];
			item.checked = !item.checked;
		},
		tickAll(state) {
			const tick = state.count > 0;
			state.count = tick ? 0 : state.ids.length;
			state.ids.forEach(id => state.items[id].checked = tick);
		},
		remove(state, action: PayloadAction<string>) {
			for (let i = 0, len = state.ids.length; i < len; i++)
				if (state.ids[i] === action.payload) {
					const item = state.items[state.ids[i]];
					if (!item.checked)
						state.count--;
					delete state.items[state.ids[i]];
					state.ids.splice(i, 1);
					break;
				}
		},
		removeChecked(state) {
			state.count < state.ids.length && (state.ids = state.ids.filter(id => {
				const del = state.items[id].checked;
				del && delete state.items[id];
				return !del;
			}));
		}
	},
});

export const actions = _slice.actions;

export const state = (state: { todos: State }) => state.todos;

export default _slice.reducer;