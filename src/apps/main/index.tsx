import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GetProjectsComponent } from "./test.graphql";

ReactDOM.render(
    <App>
        <GetProjectsComponent>
            {({ data }) => {
                if (!data) {
                    return <div>No data</div>;
                }
                console.log(data.roles[0].name);
                return <div />;
            }}
        </GetProjectsComponent>
    </App>,
    document.getElementById("app")
);
