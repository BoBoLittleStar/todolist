import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {actions} from "../features/todo/todoSlice";
import List from "./List";

export default function Todo(): JSX.Element {
	const dispatch = useDispatch();
	const [task, setTask] = useState("hello world");
	return <div>
				<input defaultValue={task}
				       onKeyDown={(e) => e.key === "Enter" && dispatch(actions.add(task))}
				       onChange={(e) => setTask(e.target.value)} />
				<button onClick={() => dispatch(actions.add(task))}>Add Task</button>
				<List />
			</div>;
}