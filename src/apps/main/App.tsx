import React from "react";
import { hot } from "react-hot-loader/root";

const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <h1>Welcome!</h1>
            {children}
        </div>
    );
};

export default hot(App);
