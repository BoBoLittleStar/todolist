import {createAsyncThunk} from "@reduxjs/toolkit";
import {address} from "../config/config";
import {TodoResponse} from "./response";
import {Item, State} from "./todo/types";

const load = createAsyncThunk<State>("get", async () => {
	const data: TodoResponse[] = await fetch(address, {
		method: "GET",
	}).then(response => response.json());
	let ids: string[] = [], count = 0, items: { [id: string]: Item } = {};
	data.forEach(elem => {
		ids.push(elem.id);
		!elem.checked && count++;
		items[elem.id] = {task: elem.task, checked: elem.checked};
	});
	return {ids, count, items};
});

const add = createAsyncThunk<TodoResponse, string>("add", async (task: string) => {
	return await fetch(address, {
		method: "POST",
		body: task,
	}).then(response => response.json());
});
const edit = createAsyncThunk<TodoResponse, { id: string, task: string }>("edit", async (payload: { id: string, task: string }) => {
	return await fetch(`${address}/${payload.id}/task`, {
		method: "PUT",
		body: payload.task,
	}).then(response => response.json());
});
const tick = createAsyncThunk<TodoResponse, string>("tick", async (id: string) => {
	return await fetch(`${address}/${id}/check`, {
		method: "PUT",
	}).then(response => response.json());
});
const tickAll = createAsyncThunk<boolean, boolean>("tickAll", async (tick: boolean) => {
	const data: TodoResponse[] = await fetch(address, {
		method: "GET",
	}).then(response => response.json());
	data.forEach(elem => elem.checked !== tick && fetch(`${address}/${elem.id}/check`, {
		method: "PUT",
	}));
	return tick;
});
const remove = createAsyncThunk<string, string>("remove", async (id: string) => {
	await fetch(`${address}/${id}`, {
		method: "DELETE",
	});
	return id;
});
const removeChecked = createAsyncThunk<void>("removeChecked", async () => {
	const data: TodoResponse[] = await fetch(address, {
		method: "GET",
	}).then(response => response.json());
	data.forEach(elem => elem.checked && fetch(`${address}/${elem.id}`, {
		method: "DELETE",
	}));
});

export const actions = {load, add, edit, tick, tickAll, remove, removeChecked};