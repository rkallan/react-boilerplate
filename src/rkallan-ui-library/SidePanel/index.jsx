import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import loadable from "@loadable/component";
import { ucFirst } from "rkallan-javascript-helpers";
import { colorWhite, colorBlack, colorWhiteDisabled, colorBigStone } from "../resources/styles/exports/_exports.scss";
import styles from "./resources/styles/sidePanel.module.scss";

const Icons = loadable(() => import(/* webpackChunkName: "Icons" */ "rkallan-ui-library/Icons"));

const SidePanel = ({ variant, children, buttonText, panelOpen, scrollable, buttonDisabled, buttonHide, onClickFunction, theme }) => {
    const [isPanelOpen, setIsPanelOpen] = useState(panelOpen);
    const [title, setTitle] = useState(isPanelOpen ? buttonText.close : buttonText.open);
    const [disabled, setDisabled] = useState(buttonHide || buttonDisabled);
    const [iconButton] = useState(["left", "right"].includes(variant) ? `arrow${ucFirst(variant)}` : variant);

    const [iconStyle, set] = useSpring(() => ({
        from: { transform: "scaleX(-1)" },
        to: { transform: "scaleX(1)" },
    }));

    set({ transform: isPanelOpen ? "scaleX(1)" : "scaleX(-1)" });

    const [buttonStyle, setButtonStyle] = useSpring(() => ({
        color: colorWhite,
        background: colorBlack,
    }));

    const unitVariant = ["content"];

    if (!scrollable) unitVariant.push("no-scroll");

    const onClickHandler = (event) => {
        if (disabled) {
            event.currentTarget.blur();
            return false;
        }

        if (onClickFunction) onClickFunction(event);

        setIsPanelOpen(!isPanelOpen);
        if (event.detail > 0) event.currentTarget.blur();

        return true;
    };

    const onMouseOverHandler = () => {
        if (disabled) return false;

        setButtonStyle({
            color: theme === "light-mode" ? colorWhite : colorBlack,
            background: theme === "light-mode" ? colorBigStone : colorWhite,
        });

        return true;
    };

    const onMouseOutHandler = (event) => {
        event.currentTarget.blur();
        if (disabled) return false;

        setButtonStyle({
            color: colorWhite,
            background: colorBlack,
        });

        return true;
    };

    useEffect(() => {
        setDisabled(buttonHide || buttonDisabled);
    }, [buttonHide, buttonDisabled]);

    useEffect(() => {
        setButtonStyle({
            color: disabled ? colorWhiteDisabled : colorWhite,
        });
    }, [disabled, setButtonStyle]);

    useEffect(() => {
        setIsPanelOpen(panelOpen);
    }, [panelOpen]);

    useEffect(() => {
        setTitle(isPanelOpen ? buttonText.close : buttonText.open);
    }, [isPanelOpen, buttonText]);

    return (
        <aside className={styles.container} variant={variant} state={isPanelOpen ? "is-open" : "is-closed"} theme={theme}>
            <article className={styles.unit} variant={unitVariant.length ? unitVariant.join(" ") : null}>
                {children}
            </article>

            <div className={styles.button} variant="container" state={buttonHide ? "hidden" : "visible"}>
                <animated.button
                    className={styles.button}
                    variant="unit"
                    title={title}
                    aria-label={title}
                    type="button"
                    style={buttonStyle}
                    onClick={onClickHandler}
                    onMouseOut={onMouseOutHandler}
                    onMouseOver={onMouseOverHandler}
                    onBlur={onMouseOutHandler}
                    onFocus={onMouseOverHandler}
                    tabIndex={disabled ? -1 : null}
                    disabled={disabled}
                    state={disabled ? "disabled" : null}
                >
                    <animated.div style={iconStyle}>
                        <Icons icon={iconButton} variant="small" />
                    </animated.div>
                    <span className={styles.title}>{title}</span>
                </animated.button>
            </div>
        </aside>
    );
};

SidePanel.defaultProps = {
    panelOpen: false,
    variant: "left",
    scrollable: true,
    buttonDisabled: false,
    buttonHide: false,
    onClickFunction: undefined,
    theme: "default",
};

SidePanel.propTypes = {
    panelOpen: PropTypes.bool,
    variant: PropTypes.oneOf(["left", "right"]),
    buttonText: PropTypes.shape({
        open: PropTypes.string,
        close: PropTypes.string,
    }).isRequired,
    children: PropTypes.node.isRequired,
    scrollable: PropTypes.bool,
    buttonDisabled: PropTypes.bool,
    buttonHide: PropTypes.bool,
    onClickFunction: PropTypes.func,
    theme: PropTypes.string,
};

export default SidePanel;
