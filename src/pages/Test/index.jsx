import React from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import { Loading } from "rkallan-ui-library";

const InputTypeRange = loadable(() => import(/* webpackChunkName: "InputTypeRange" */ "rkallan-ui-library/InputTypeRange"), {
    fallback: <Loading />,
});

const Test = () => {
    return (
        <div>
            <h1>TEST PAGE</h1>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </p>
            <p>
                <Link to={`${process.env.PUBLIC_URL}/login`}>Login Page</Link>
                <br />
                <Link to={`${process.env.PUBLIC_URL}/`}>Homepage</Link>
            </p>

            <ul>
                <li>test 1</li>
                <li>test 1</li>
                <li>test 1</li>
                <li>test 1</li>
            </ul>

            <InputTypeRange
                label={{ for: "valuta", text: "Amount", icon: undefined }}
                attributes={{ min: 0, max: 25, step: 0.01, defaultValue: 0, name: "valuta", orient: "vertical", variant: "vertical", readOnly: true }}
                output={{ show: true, unit: "€", prefix: true }}
            />
            <InputTypeRange
                attributes={{ min: 0, max: 25, step: 0.01, defaultValue: 10, name: "test", orient: "horizontal", variant: "horizontal" }}
                output={{ show: true, unit: "%", prefix: false, fixedDecimals: 2 }}
            />
        </div>
    );
};

export default Test;
