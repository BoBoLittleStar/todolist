import React from "react";
import {useSelector} from "react-redux";
import {state as _state} from "../features/todo/todoSlice";
import Li from "./Item";

export default function List(): JSX.Element {
	const state = useSelector(_state);
	const li: JSX.Element[] = [];
	state.ids.forEach(id => li.push(<Li>{{id: id, item: state.items[id]}}</Li>));
	return <ul>{li}</ul>;
}