import { useState, useEffect } from "react";
import firebase from "@firebase/app";
import "@firebase/auth";

function useAuthProvider() {
    const [state, setState] = useState(() => {
        const user = firebase.auth().currentUser;
        return { initializing: !user, user };
    });

    const onChange = async (data) => {
        const user = await data;

        setState({ initializing: false, user });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange);

        return () => unsubscribe();
    }, []);

    return state;
}

export default useAuthProvider;
