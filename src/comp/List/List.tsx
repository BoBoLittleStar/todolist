import React from "react";
import {useSelector} from "react-redux";
import {state as todos} from "../../reducers/todo/todoSlice";
import Item from "../Item/Item";
import "./List.sass";

export default function List(): JSX.Element {
	const state = useSelector(todos), li: JSX.Element[] = [];
	state.ids.forEach(id => li.push(<Item key={id}>{{id: id, item: state.items[id]}}</Item>));
	return <ul>{li}</ul>;
}