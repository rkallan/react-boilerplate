import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "rkallan-react-hooks";
import styles from "./resources/styles/accordion.module.scss";

const Icons = loadable(() => import(/* webpackChunkName: "Icons" */ "rkallan-ui-library/Icons"));

const Accordion = ({ title, id, children, prefix, defaultIsOpen, disabled, tabIndex, autoClose, autoOpen, getIsOpen, theme }) => {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);
    const [contentMeasure, { height }] = useMeasure();

    const { iconStyle } = useSpring({
        from: { iconStyle: 0 },
        iconStyle: isOpen ? 1 : 0,
    });

    const { contentContainerStyle } = useSpring({
        from: { contentContainerStyle: 0 },
        contentContainerStyle: isOpen ? 1 : 0,
    });

    const onClickHandler = (event) => {
        const value = !isOpen;
        setIsOpen(value);

        getIsOpen({ value, id });
        if (event.detail > 0) event.currentTarget.blur();
    };

    useEffect(() => {
        if (autoClose) setIsOpen(false);
    }, [autoClose]);

    useEffect(() => {
        if (autoOpen) setIsOpen(true);
    }, [autoOpen]);

    return (
        <article className={styles.container} theme={theme}>
            <button
                className={styles.button}
                type="button"
                onClick={onClickHandler}
                disabled={disabled ? true : null}
                state={disabled ? "disabled" : null}
                tabIndex={tabIndex || null}
            >
                {prefix && !!Object.keys(prefix).length && <div className={styles.prefix} variant={`color-${prefix.variant}`} />}

                <div className={styles.title}>{title}</div>

                <animated.div
                    className={styles.icon}
                    style={{
                        transform: iconStyle.interpolate({
                            range: [0, 1],
                            output: ["rotateZ(0deg)", "rotateZ(-90deg)"],
                        }),
                    }}
                >
                    <Icons icon="arrowLeft" variant="small" />
                </animated.div>
            </button>

            <animated.div
                className={styles.content}
                style={{
                    height: contentContainerStyle.interpolate({
                        range: [0, 1],
                        output: ["0rem", `${height / 16}rem`],
                    }),
                }}
                variant="container"
                state={isOpen ? "is-open" : "is-closed"}
            >
                <div {...contentMeasure} className={styles.content} variant="unit">
                    {children}
                </div>
            </animated.div>
        </article>
    );
};

Accordion.defaultProps = {
    id: 1,
    prefix: {},
    defaultIsOpen: false,
    disabled: false,
    tabIndex: undefined,
    autoClose: false,
    autoOpen: false,
    getIsOpen: undefined,
    theme: "default",
};

Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number,
    children: PropTypes.node.isRequired,
    prefix: PropTypes.shape({
        variant: PropTypes.string,
    }),
    defaultIsOpen: PropTypes.bool,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    autoClose: PropTypes.bool,
    autoOpen: PropTypes.bool,
    getIsOpen: PropTypes.func,
    theme: PropTypes.string,
};

export default Accordion;
