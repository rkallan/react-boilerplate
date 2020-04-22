const getAuthenticationState = ({ authentication }) => authentication;
const getLoginStatus = ({ authentication }) => authentication.loginStatus;
const getToken = ({ authentication }) => authentication.token;
const getSessionCreationDate = ({ authentication }) => authentication.sessionCreationDate;
const getUser = ({ authentication }) => authentication.user;
const getLoginDetails = ({ authentication }) => {
    const { loginStatus, token, sessionCreationDate } = authentication;
    return {
        loginStatus,
        token,
        sessionCreationDate,
    };
};

export { getAuthenticationState, getLoginStatus, getToken, getSessionCreationDate, getUser, getLoginDetails };
