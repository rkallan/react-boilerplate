const getValueOfElement = {
    input: (element) => {
        if (element && element.type && ["radio", "checkbox"].includes(element.type)) {
            if (element.checked) return element.value.trim();

            return undefined;
        }

        if (element && element.type) return element.value.trim();

        return undefined;
    },

    textarea: (element) => {
        return (element && element.value.trim()) || undefined;
    },

    select: (element) => {
        if (element && element.type && element.type === "select-one" && element.value) return element.value;

        if (element && element.type && element.type === "select-multiple") {
            const value = [];
            if (element.value && element.options) {
                Object.keys(element.options).forEach((optionKey) => {
                    if (element.options[optionKey].selected) value.push(element.options[optionKey].value);
                });
            }
            return value;
        }

        return undefined;
    },

    button: (element) => {
        return (element && element.value.trim()) || undefined;
    },
};

export default getValueOfElement;
