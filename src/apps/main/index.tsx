import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GetProjectsComponent } from "./test.graphql";

ReactDOM.render(
    <App>
        <GetProjectsComponent>
            {() => {
                return <div />;
            }}
        </GetProjectsComponent>
    </App>,
    document.getElementById("app")
);
