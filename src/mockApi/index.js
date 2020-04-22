import { createToken, decodeToken } from "rkallan-javascript-helpers";
import { users, userRoles } from "./resources/data";

const configureMockApi = () => {
    window.fetch = (url, opts) => {
        const authHeader = opts.headers.Authorization;
        const token = (authHeader && authHeader.split(" ")[1]) || undefined;
        const jwtDataObject = token && decodeToken(token);
        const userData = jwtDataObject && "payload" in jwtDataObject && users.find((user) => user.id === jwtDataObject.payload.id);
        const isLoggedIn = !!(userData && Object.keys(userData).length);
        const userRole = userData && userData.userRole;

        return new Promise((resolve) => {
            const ok = (body) => {
                resolve({
                    status: 200,
                    ok: true,
                    json: () => Promise.resolve(body),
                });
            };

            const error = (message) => {
                resolve({
                    ok: false,
                    status: 400,
                    error: () => ({
                        message,
                        status: 400,
                    }),
                });
            };

            const unauthorised = () => {
                resolve({
                    ok: false,
                    status: 401,
                    error: () => ({ message: "Unauthorised" }),
                });
            };

            const forbidden = () => {
                resolve({
                    ok: false,
                    status: 403,
                    error: () => ({
                        message: "Forbidden",
                        status: 403,
                    }),
                });
            };

            const notFound = () => {
                resolve({
                    ok: false,
                    status: 404,
                    error: () => ({
                        message: "Not found",
                        status: 404,
                    }),
                });
            };

            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith("/auth/login") && opts.method === "POST") {
                    const params = JSON.parse(opts.body);
                    if (!params.email && !params.username) return error("Username, emailaddress or password is incorrect");

                    const user = users.find(
                        (tempUser) => (tempUser.email === params.email || tempUser.username === params.username) && tempUser.password === params.password
                    );

                    if (!user) return error("Username, emailaddress or password is incorrect");

                    delete user.password;

                    const date = new Date();
                    const sessionCreationDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${
                        date.getMinutes() < 10 ? 0 : ""
                    }${date.getMinutes()}:${date.getSeconds() < 10 ? 0 : ""}${date.getSeconds()}`;

                    const payloadData = {
                        id: user.id,
                        username: user.username,
                        organisationId: user.organisationId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        loginStatus: 1,
                        sessionCreationDate,
                    };

                    const jwtToken = createToken(payloadData, process.env.REACT_APP_SECRET_KEY);

                    return ok({
                        ...user,
                        token: jwtToken,
                        loginStatus: 1,
                        sessionCreationDate,
                    });
                }

                //  authenticate logoff - public
                if (url.endsWith("/auth/logoff") && opts.method === "POST") {
                    return ok({
                        body: {
                            loginStatus: 0,
                        },
                        error: null,
                        status: 200,
                    });
                }

                // get user profile
                if (url.endsWith("/user/profile") && opts.method === "POST") {
                    const params = JSON.parse(opts.body);
                    const user = users.find((x) => x.clientId === params.clientId);

                    if (!user) return error("User not found");

                    delete user.password;
                    return ok({
                        body: {
                            ...user,
                            loginStatus: 1,
                        },
                        error: null,
                        status: 200,
                    });
                }

                // get user role
                if (url.endsWith("/user/role") && opts.method === "POST") {
                    const params = JSON.parse(opts.body);
                    const user = users.find((x) => x.clientId === params.clientId);

                    if (!user) return error("User not found");

                    return ok({
                        body: {
                            userRole: user.userRole,
                        },
                        error: null,
                        status: 200,
                    });
                }

                // get user by id - admin & user (user can only access their own record)
                if (url.match(/\/users\/\d+$/) && opts.method === "GET") {
                    if (!isLoggedIn) return unauthorised();

                    const urlParts = url.split("/");
                    const id = parseInt(urlParts[urlParts.length - 1], 10);

                    if (userData.id !== id && userData.userRole > userRoles.manager) return forbidden();

                    const user = users.find((x) => x.id === id);

                    if (!user) return error("User not found");

                    delete user.password;
                    return ok(user);
                }

                // get all users - admin only
                if (url.endsWith("/users") && opts.method === "GET") {
                    if (userRole > userRoles.admin) return forbidden();

                    return ok(users);
                }

                // pass through any requests not handled above
                return notFound();
            }, 50);
        });
    };
};

export default configureMockApi;
