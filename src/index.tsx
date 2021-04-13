import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import App from "./comp/App/App";
import "./comp/index.sass";
import {store} from "./reducers/store";

render(
	<React.StrictMode>
		<Provider store={store}>
			<header>
				<h1>todos</h1>
			</header>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);