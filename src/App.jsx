import React from "react";
import logo from "./resources/svg/logo.svg";
import styles from "./resources/styles/App.module.scss";

import Test from "./Test";

function App() {
    const x = {
        text: "test",
    };

    return (
        <div className={styles.App}>
            <header className={styles["App-header"]}>
                <img src={logo} className={styles["App-logo"]} alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className={styles["App-link"]} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
                <Test {...x} />
            </header>
        </div>
    );
}

export default App;
