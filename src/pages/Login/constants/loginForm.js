import i18next from "i18n";

let dataObject = {
    attributes: {
        id: "login-form",
        method: "post",
        name: "login-form",
        className: "unit",
        autoComplete: "off",
        "data-required": true,
        action: "api/auth/login",
        noValidate: true,
        fieldsets: [],
    },
};

i18next.loadNamespaces(["loginForm"]).then(() => {
    return dataObject;
});

const loginFormObject = () => {
    return dataObject;
};

i18next.on("loaded", () => {
    const elements = {
        email: {
            id: 1,
            label: {
                for: "login-email",
                text: "Hallo testtt",
            },
            node: "input",
            attributes: {
                name: "email",
                type: "email",
                placeholder: i18next.t("loginForm:Emailaddress"),
                autoComplete: "email",
                "data-required": true,
                "data-validation-types": JSON.stringify({
                    hasMinimalAndMaximalCharacters: { minCharacters: 5, maxCharacters: 256 },
                    email: null,
                }),
                state: "isEmpty",
            },
            state: "isEmpty",
        },
        password: {
            id: 2,
            label: {
                for: "login-password",
            },
            node: "input",
            attributes: {
                name: "password",
                type: "password",
                placeholder: i18next.t("loginForm:Password"),
                autoComplete: "current-password",
                "data-required": true,
                "data-validation-types": JSON.stringify({
                    hasMinimalAndMaximalCharacters: { minCharacters: 3, maxCharacters: 256 },
                }),
                state: "isEmpty",
            },
            state: "isEmpty",
        },
    };

    const buttons = {
        submit: {
            id: 3,
            node: "button",
            icon: "submit",
            text: i18next.t("loginForm:Login"),
            attributes: {
                type: "submit",
                "aria-label": i18next.t("loginForm:Login"),
                variant: "text-only",
                disabled: true,
            },
            noBorder: true,
            align: "end",
            color: "color-grey",
        },
    };

    const fieldsets = [
        {
            id: 1,
            caption: "Variable Form",
            disabled: false,
            form: null,
            name: null,
            elements,
        },
        {
            id: 2,
            caption: "Variable Form Buttons",
            disabled: false,
            form: null,
            name: null,
            variant: "row-reverse",
            elements: buttons,
        },
    ];

    dataObject = { ...dataObject, fieldsets };
    return dataObject;
});

export default loginFormObject;
