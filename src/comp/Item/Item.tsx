import styled from "@emotion/styled";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {actions} from "../../reducers/request";
import {Item as _Item} from "../../reducers/todo/types";
import "./Item.sass";

type Element = {
	id: string,
	item: _Item,
}

export default function Item({children: elem}: { children: Element }): JSX.Element {
	const dispatch = useDispatch();
	const [edit, setEdit] = useState("");
	const task = elem.item.task, checked = elem.item.checked, editing = edit === elem.id;

	const Button = styled.button<{ checked: boolean, editing: boolean }>`
      border-color: ${props => props.editing ? "transparent" : (props.checked ? "#cbdfdb" : "#f0f0f0")};;
	`;
	const Div = styled.div<{ checked: boolean, editing: boolean }>`
      border-color: ${props => props.editing ? "transparent" : (props.checked ? "#5dc2ae" : "transparent")};
	`;
	const P = styled.p<{ checked: boolean }>`
      color: ${props => props.checked ? "lightgray" : "black"};
      text-decoration-line: ${props => props.checked ? "line-through" : "none"};
	`;

	return <li>
		<div>
			<Button className="select" checked={checked} editing={editing} onClick={() => !editing && dispatch(actions.tick(elem.id))}>
				<Div className="tick" checked={checked} editing={editing} />
			</Button>
			<div onDoubleClick={() => setEdit(elem.id)}>
				<P checked={checked}>{task}</P>
				<input defaultValue={task}
				       onBlurCapture={(e) => {
					       let target = e.target, temp = target.value.trim();
					       temp ? dispatch(actions.edit({
						       id: elem.id,
						       task: temp,
					       })) : (target.value = target.defaultValue);
					       setEdit("");
				       }}
				       onKeyDown={(e) => {
					       let target = e.target as HTMLInputElement;
					       e.key === "Escape" && !(target.value = "") && target.blur();
					       e.key === "Enter" && target.blur();
				       }}
				       hidden={!editing} />
				<button className="button-delete" onClick={() => dispatch(actions.remove(elem.id))} hidden={editing}>
					<div className="cross-a" />
					<div className="cross-b" />
				</button>
			</div>
		</div>
	</li>;
};