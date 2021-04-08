import {configureStore} from "@reduxjs/toolkit";
import {Item, State} from "./todo/state";
import reducer from "./todo/todoSlice";

const load = (): State => {
	try {
		let ids: string[] = [], count: number = 0, items: { [id: string]: Item } = {};
		let temp: any = (localStorage.getItem("ids")), item: any, invalids: { [id: string]: boolean } = {};
		temp && (ids = JSON.parse(temp));
		temp = (localStorage.getItem("count"));
		temp && (count = JSON.parse(temp));
		ids.forEach(id => {
			if ((item = localStorage.getItem(id)))
				items[id] = JSON.parse(item);
			else
				invalids[id] = true;
		});
		ids = ids.filter(id => !invalids[id]);
		return {ids, count, items};
	} catch (err) {
		console.log(err);
		return {ids: [], count: 0, items: {}};
	}
};

const save = (state: State) => {
	try {
		localStorage.clear();
		localStorage.setItem("ids", JSON.stringify(state.ids));
		localStorage.setItem("count", JSON.stringify(state.count));
		state.ids.forEach(id => localStorage.setItem(id, JSON.stringify(state.items[id])));
	} catch (err) {
		console.log(err);
	}
};

const store = configureStore({
	preloadedState: {todos: load()},
	reducer: {
		todos: reducer,
	},
});

store.subscribe(() => save(store.getState().todos));

export default store;