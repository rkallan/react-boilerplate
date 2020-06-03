import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "rkallan-ui-library";
const Homepage = () => {
    return (
        <div>
            <h1>Homepage</h1>
            <Icons name="home" />
            <Link to={`${process.env.PUBLIC_URL}/test`}>Test Page</Link>
        </div>
    );
};

export default Homepage;
