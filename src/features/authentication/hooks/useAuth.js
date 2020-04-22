import { useContext } from "react";
import authContext from "../authContext";

const useAuth = () => {
    const auth = useContext(authContext);

    return auth;
};

export default useAuth;
