import styled from "@emotion/styled";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {actions} from "../../reducers/todo/todoSlice";
import {Item as _Item} from "../../reducers/todo/types";
import "./Item.sass";

type Element = {
	id: string,
	item: _Item,
}

export default function Item({children: elem}: { children: Element }): JSX.Element {
	const dispatch = useDispatch();
	const [edit, setEdit] = useState("");
	const [filter, setFilter] = useState("");
	const check = elem.item.checked, editing = edit === elem.id;

	const Button = styled.button<{ check: boolean, hidden: boolean }>`
      border-color: ${props => props.check ? "#cbdfdb" : "#f0f0f0"};
      display: block;
	`;
	const Div = styled.div<{ check: boolean }>`
      border-color: ${props => props.check ? "#5dc2ae" : "transparent"};
	`;

	return <li hidden={elem.item.checked ? filter === "unchecked" : filter === "checked"}>
		<div>
			<Button className={"select"} check={check} hidden={editing} onClick={() => dispatch(actions.tick(elem.id))}>
				<Div className={`tick`} check={check} />
			</Button>
			<div onDoubleClick={() => setEdit(elem.id)}>
				<input defaultValue={elem.item.task}
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
				       disabled={!editing} />
			</div>
		</div>
	</li>;
};