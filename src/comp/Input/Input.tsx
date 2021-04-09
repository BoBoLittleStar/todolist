import React from "react";
import {useDispatch} from "react-redux";
import {actions} from "../../reducers/todo/todoSlice";
import "./Input.sass";

export default function Input(): JSX.Element {
	const dispatch = useDispatch();
	return <input placeholder="What needs to be done?"
	              onKeyDown={(e) => {
		              let target = e.target as HTMLInputElement, temp = e.key === "Enter" && target.value.trim();
		              temp && dispatch(actions.add(temp)) && (target.value = "");
	              }} />;
}