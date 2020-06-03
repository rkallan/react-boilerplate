import i18next from "i18n";

let dataObject = {
    variant: "column",
    attributes: {
        name: "color-mode",
        type: "radio",
    },
    items: [],
};

i18next.loadNamespaces(["colorScheme"]).then(() => {
    return dataObject;
});

const colorSchemeRadioObject = () => {
    return dataObject;
};

i18next.on("loaded", () => {
    const items = [
        {
            id: 1,
            value: "dark-mode",
            label: {
                for: "dark-mode",
                text: i18next.t("colorScheme:Dark mode"),
            },
        },
        {
            id: 2,
            value: "light-mode",
            label: {
                for: "light-mode",
                text: i18next.t("colorScheme:Light mode"),
            },
        },
    ];
    dataObject = { ...dataObject, items };
    return dataObject;
});

export default colorSchemeRadioObject;
