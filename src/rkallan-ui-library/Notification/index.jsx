import React from "react";
import loadable from "@loadable/component";
import PropTypes from "prop-types";
import { Loading } from "rkallan-ui-library";
import styles from "./resources/styles/notification.module.scss";

const Icons = loadable(() => import(/* webpackChunkName: "Icons" */ "rkallan-ui-library/Icons"), {
    fallback: <Loading />,
});

const Notification = ({ children, variant }) => {
    const icon = variant === "confirm" ? "confirm" : "alert";
    return (
        <section className={styles.container}>
            <div className={styles.icon}>
                <Icons icon={icon} variant="normal" />
            </div>
            <div className={styles.content}>{children}</div>
            <div className={styles.closeButton}>
                <button type="button">
                    <Icons icon="closeCross" variant="small" />
                </button>
            </div>
        </section>
    );
};

Notification.defaultProps = {
    variant: "confirm",
};

Notification.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(["confirm", "error", "warning"]),
};

export default Notification;
