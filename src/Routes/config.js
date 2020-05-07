import loadable from "@loadable/component";

const Login = loadable(() => import(/* webpackChunkName: "Test" */ "pages/Login"));
const Test = loadable(() => import(/* webpackChunkName: "Test" */ "pages/Test"));
const Homepage = loadable(() => import(/* webpackChunkName: "Test" */ "pages/Homepage"));
const Error404 = loadable(() => import(/* webpackChunkName: "Test" */ "pages/Error/404"));
const FormPage = loadable(() => import(/* webpackChunkName: "Test" */ "pages/Form"));

const appRoutes = [
    {
        id: 1,
        path: "/login",
        component: Login,
        exact: true,
        title: "Login",
    },
    {
        id: 3,
        path: "/",
        component: Homepage,
        exact: true,
        title: "Homepage",
        authenticated: true,
    },
    {
        id: 4,
        path: "/test",
        component: Test,
        exact: true,
        title: "Test",
    },
    {
        id: 6,
        path: "/form",
        component: FormPage,
        title: "FormPage",
        authenticated: true,
    },
    {
        id: 5,
        path: "*",
        component: Error404,
        title: "ERROR",
    },
];

export default appRoutes;
