import i18next from "i18n";

let dataObject = {
    attributes: {
        id: "form-page",
        method: "post",
        name: "form-page",
        className: "unit",
        autoComplete: "off",
        "data-required": true,
        action: "#",
        noValidate: true,
        fieldsets: [],
    },
};

i18next.loadNamespaces(["formPage"]).then(() => {
    return dataObject;
});

const formPageObject = () => {
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
                // defaultValue: "aap",
                placeholder: i18next.t("formPage:Emailaddress"),
                "data-required": true,
                "data-validation-types": JSON.stringify({
                    hasMinimalAndMaximalCharacters: { minCharacters: 5, maxCharacters: 256 },
                    email: null,
                }),
            },
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
                placeholder: i18next.t("formPage:Password"),
                autoComplete: "current-password",
                "data-required": true,
                "data-validation-types": JSON.stringify({
                    hasMinimalAndMaximalCharacters: { minCharacters: 3, maxCharacters: 256 },
                    containsNot: { notAllowed: [" "] },
                }),
            },
        },
        text: {
            id: 8,
            label: {
                for: "form-text",
            },
            node: "input",
            attributes: {
                name: "text",
                type: "text",
                // defaultValue: "ra vi",
                placeholder: i18next.t("formPage:Text"),
                "data-required": true,
                "data-validation-types": JSON.stringify({
                    hasMinimalAndMaximalCharacters: { minCharacters: 3, maxCharacters: 256 },
                    containsNot: { notAllowed: [" "] },
                }),
                disabled: true,
                readOnly: true,
            },
        },
        select: {
            id: 3,
            label: {
                for: "variable-type",
                text: i18next.t("formPage:Type"),
            },
            node: "select",
            attributes: {
                placeholder: i18next.t("formPage:Type"),
                name: "type",
                // defaultValue: [1, 2],
                multiple: true,
                "data-required": true,
                // readOnly: true,
            },
            // defaultValue: [1, 2],
            optionGroup: [
                {
                    id: 1,
                    title: i18next.t("formPage:Select variable type"),
                    options: [
                        {
                            id: 6,
                            text: i18next.t("formPage:--- Select one ---"),
                            attributes: {
                                value: "",
                                disabled: true,
                                hidden: true,
                            },
                        },
                        {
                            id: 1,
                            text: i18next.t("formPage:Integer"),
                            attributes: {
                                value: 1,
                            },
                        },
                        {
                            id: 2,
                            text: i18next.t("formPage:String"),
                            attributes: {
                                value: 2,
                            },
                        },
                        {
                            id: 3,
                            text: i18next.t("formPage:Boolean"),
                            attributes: {
                                value: 3,
                            },
                        },
                        {
                            id: 4,
                            text: i18next.t("formPage:Float"),
                            attributes: {
                                value: 4,
                            },
                        },
                        {
                            id: 5,
                            text: i18next.t("formPage:Date"),
                            attributes: {
                                value: 5,
                            },
                        },
                    ],
                },
            ],
        },
        radio: {
            id: 4,
            label: {
                for: "login-email",
                text: "Hallo testtt",
            },
            node: "radio",
            variant: "column",
            attributes: {
                name: "grid",
                type: "radio",
                "data-required": true,
                defaultChecked: false,
            },
            items: [
                {
                    id: 1,
                    value: true,
                    checked: false,
                    label: {
                        for: "grid-on",
                        text: "Grid on",
                    },
                },
                {
                    id: 2,
                    value: false,
                    checked: false,
                    label: {
                        for: "grid-off",
                        text: "Grid off",
                    },
                },
            ],
        },
    };

    const buttons = {
        submit: {
            id: 5,
            node: "button",
            icon: "submit",
            text: i18next.t("formPage:Login"),
            attributes: {
                type: "submit",
                "aria-label": i18next.t("formPage:Login"),
                variant: "text-only",
                disabled: true,
            },
            noBorder: true,
            align: "end",
            color: "color-grey",
        },
        reset: {
            id: 6,
            node: "button",
            icon: "reset",
            text: i18next.t("formPage:reset"),
            attributes: {
                type: "reset",
                "aria-label": i18next.t("formPage:reset"),
                variant: "text-only",
                disabled: false,
            },
            noBorder: true,
            align: "end",
            color: "color-grey",
        },
        test: {
            id: 7,
            label: {
                for: "login-email",
                text: "Hallo testtt",
            },
            node: "input",
            attributes: {
                name: "test",
                type: "submit",
                value: "test send",
                placeholder: i18next.t("formPage:Login"),
            },
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

export default formPageObject;
