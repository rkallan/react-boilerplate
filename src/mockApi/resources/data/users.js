import userRoles from "./userRoles";

const users = [
    {
        id: 1,
        username: "ravi",
        email: "r.kallan@upcmail.nl",
        organisationId: 1,
        organisationName: "R@viK",
        password: "ravi",
        firstName: "Ravi",
        lastName: "Kallan",
        userRole: userRoles.root,
    },
    {
        id: 2,
        username: "stefan",
        email: "stefan@@mm-2.nl",
        organisationId: 2,
        organisationName: "MM2",
        password: "stefan",
        firstName: "Stefan",
        lastName: "Janssen",
        userRole: userRoles.admin,
    },
];

export default users;
