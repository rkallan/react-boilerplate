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
                placeholder: i18next.t("formPage:Emailaddress"),
                "data-required": true,
                "data-validation-types": JSON.stringify({
                    hasMinimalAndMaximalCharacters: { minCharacters: 5, maxCharacters: 256 },
                    email: null,
                }),
                autoFocus: false,
            },
            defaultValue: "r@vi.",
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
                for: "select-single",
                text: i18next.t("formPage:Select single"),
            },
            node: "select",
            attributes: {
                placeholder: i18next.t("formPage:Select single"),
                name: "select-single",
                "data-required": true,
                // readOnly: true,
            },
            defaultValue: "",
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
        selectMulti: {
            id: 12,
            label: {
                for: "select-multiple",
                text: i18next.t("formPage:Select multiple"),
            },
            node: "select",
            attributes: {
                placeholder: i18next.t("formPage:Select multiple"),
                name: "select-multiple",
                multiple: true,
                "data-required": true,
                // readOnly: true,
            },
            defaultValue: [1, 2],
            optionGroup: [
                {
                    id: 1,
                    title: i18next.t("formPage:Select multiple"),
                    options: [
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
                defaultChecked: true,
            },
            items: [
                {
                    id: 1,
                    value: true,
                    label: {
                        for: "grid-on",
                        text: "Grid on",
                    },
                },
                {
                    id: 2,
                    value: false,
                    label: {
                        for: "grid-off",
                        text: "Grid off",
                    },
                },
            ],
        },
        checkbox: {
            id: 13,
            label: {
                for: "checkbox",
                text: "Checkbox",
            },
            node: "checkbox",
            variant: "column",
            attributes: {
                name: "chechbox",
                type: "checkbox",
                "data-required": true,
                defaultChecked: [2, 3],
            },
            items: [
                {
                    id: 1,
                    value: 1,
                    label: {
                        for: "example-1",
                        text: "Example 1",
                    },
                },
                {
                    id: 2,
                    value: 2,
                    label: {
                        for: "example-2",
                        text: "Example 2",
                    },
                },
                {
                    id: 3,
                    value: 3,
                    label: {
                        for: "example-3",
                        text: "Example 3",
                    },
                },
            ],
        },
    };

    const valueKey = {
        day: {
            id: 9,
            label: {
                for: "date-day",
            },
            node: "input",
            attributes: {
                name: "date",
                type: "text",
                placeholder: i18next.t("formPage:day"),
                "data-required": true,
                "data-value-key": "day",
            },
        },
        month: {
            id: 10,
            label: {
                for: "date-month",
            },
            node: "input",
            attributes: {
                name: "date",
                type: "text",
                placeholder: i18next.t("formPage:month"),
                "data-required": true,
                "data-value-key": "month",
            },
        },
        year: {
            id: 11,
            label: {
                for: "date-year",
            },
            node: "input",
            attributes: {
                name: "date",
                type: "text",
                placeholder: i18next.t("formPage:year"),
                "data-required": true,
                "data-value-key": "year",
            },
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
            id: 3,
            caption: "Variable Form",
            disabled: false,
            form: null,
            name: null,
            variant: "row",
            elements: valueKey,
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
