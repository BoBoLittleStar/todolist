/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import App from "./comp/App";
import store from "./features/store";
import "./resources/css/index.css";

render(
	<React.StrictMode>
		<Provider store={store}>
			<header>
				<h1 css={css`
                  text-align: center;
                  margin: 4px;
                  font-size: 77pt;
                  font-weight: lighter;
                  color: #e8d9d9;
				`}>todos</h1>
			</header>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);