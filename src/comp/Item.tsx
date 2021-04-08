import React, {ReactChild, useState} from "react";
import {useDispatch} from "react-redux";
import {Item} from "../features/todo/state";
import {actions} from "../features/todo/todoSlice";

type Element = {
	id: string,
	item: Item,
}

export default function Li({children: elem}: { children: Element }): JSX.Element {
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(null);
	const [filter, setFilter] = useState(null);
	const [check, displaying] = [elem.item.checked, edit === elem.id];
	return <li hidden={elem.item.checked ? filter === "unchecked" : filter === "checked"}>
		<button onClick={() => dispatch(actions.tick(elem.id))}>
			<div></div>
		</button>
		<label></label>
	</li>;
};