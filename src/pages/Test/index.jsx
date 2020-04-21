import React from "react";
import { Link } from "react-router-dom";

const Test = () => {
    return (
        <div>
            <h1>TEST PAGE</h1>
            <Link to={`${process.env.PUBLIC_URL}/login`}>Login Page</Link>
            <br />
            <Link to={`${process.env.PUBLIC_URL}/`}>Homepage</Link>
        </div>
    );
};

export default Test;
