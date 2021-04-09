/** @jsxImportSource @emotion/react */
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions, state as todos} from "../../reducers/todo/todoSlice";
import Input from "../Input/Input";
import List from "../List/List";
import "./App.sass";

export default function App(): JSX.Element {
	const [task, setTask] = useState("");
	const state = useSelector(todos), dispatch = useDispatch();
	return <div className="page">
		<div className="header">
			<button className="select-all"
			        onClick={() => dispatch(actions.tickAll())}>
				<div className={`arrow${state.count === 0 ? "-all" : ""}`}
				     hidden={state.ids.length === 0}>❯</div>
			</button>
			<Input />
		</div>
		<List />
	</div>;
}