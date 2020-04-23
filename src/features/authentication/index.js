import firebase from "@firebase/app";
import "@firebase/auth";

const login = async ({ email, password }) => {
    const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
            return error;
        });

    return response;
};

const logout = () => {
    firebase.auth().signOut();
};

export { login, logout };
