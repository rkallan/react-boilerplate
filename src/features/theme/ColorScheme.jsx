import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "rkallan-react-hooks";
import { Loading } from "rkallan-ui-library-loc";
import { setThemeColorScheme } from "./themeSlice";
import colorSchemeRadioObject from "./constants/colorSchemeRadioObject";

// import styles from "./resources/styles/colorScheme.module.scss";

const InputTypeRadio = loadable(
    () => import(/* webpackChunkName: "InputTypeRadio-themeColorScheme" */ "rkallan-ui-library-loc/InputTypeRadio"),
    {
        fallback: <Loading />,
    }
);

const ColorScheme = () => {
    const dispatch = useDispatch();
    useTranslation("colorScheme");
    const [getColorScheme, setColorScheme] = useColorScheme();
    const [defaultChecked] = useState(getColorScheme);
    const [radioObject] = useState(colorSchemeRadioObject());

    radioObject.attributes.defaultChecked = defaultChecked;

    const onChangeEventHandler = (event) => {
        const { value } = event.currentTarget;

        if (value === getColorScheme) return;

        setColorScheme(value);
        dispatch(setThemeColorScheme(value));
    };

    useEffect(() => {
        dispatch(setThemeColorScheme(defaultChecked));
    }, [dispatch, defaultChecked]);

    return (
        <div>
            {getColorScheme} - {defaultChecked}
            <InputTypeRadio {...radioObject} customOnChangeHandler={onChangeEventHandler} />
        </div>
    );
};

export default ColorScheme;
