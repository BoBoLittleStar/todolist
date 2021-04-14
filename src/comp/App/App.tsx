/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../reducers/request";
import {selector} from "../../reducers/todo/state";
import Input from "../Input/Input";
import Item from "../Item/Item";
import "./App.sass";

export default function App(): JSX.Element {
	const [filter, setFilter] = useState("");
	const state = useSelector(selector), dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.load());
	}, [dispatch]);
	const li: JSX.Element[] = [];
	state.ids.forEach(id => (!filter || filter === (state.items[id].checked ? "checked" : "unchecked")) && li.push(
		<Item key={id}>{{id: id, item: state.items[id]}}</Item>
	));

	const Arrow = styled.div<{ allTicked: boolean }>`
      display: inherit;
      color: ${props => props.hidden ? "transparent" : (props.allTicked ? "#737373" : "#e6e6e6")};
	`;
	const Filter = styled.label<{ checked: boolean }>`
      border: 1px solid ${props => props.checked ? "#f0d6d7" : "transparent"};
      margin: 10px;
      padding: 4px 8px;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
        border-color: ${props => props.checked ? "#f0d6d7" : "#f7ebea"};
      }
	`;
	const Clear = styled.label`
      color: ${props => props.hidden ? "transparent" : "inherit"};
      display: inherit;
      border: none;
      cursor: pointer;

      &:hover {
        text-decoration-line: underline;
      }
	`;

	return <div className="page">
		<div className="header">
			<div className="header-row">
				<button className="select-all"
				        onClick={() => dispatch(actions.tickAll(state.count > 0))}>
					<Arrow className="arrow"
					       allTicked={state.count === 0}
					       hidden={state.ids.length === 0}>❯</Arrow>
				</button>
			</div>
			<Input />
		</div>
		<ul>{li}</ul>
		<div className="footer" hidden={state.ids.length === 0}>
			<div className="left">
				{state.count} item{state.count === 1 ? "" : "s"} left
			</div>
			<div className="center">
				<Filter checked={filter === ""} onClick={() => filter !== "" && setFilter("")}>All</Filter>
				<Filter checked={filter === "unchecked"} onClick={() => filter !== "unchecked" && setFilter("unchecked")}>Active</Filter>
				<Filter checked={filter === "checked"} onClick={() => filter !== "checked" && setFilter("checked")}>Completed</Filter>
			</div>
			<div className="right">
				<Clear hidden={state.count === state.ids.length}
				       onClick={() => dispatch(actions.removeChecked())}>Clear completed</Clear>
			</div>
		</div>
	</div>;
}