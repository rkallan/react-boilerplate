import { validations } from "../validations";

const getValueOfElement = {
    input: (element) => {
        if (!element) return undefined;

        const elementType = element.type;
        const value = element.value.trim();

        switch (elementType) {
            case "radio":
            case "checkbox":
                if (element.checked) return validations.isJSONString(value) ? JSON.parse(value) : value;
                break;
            default:
                return validations.isJSONString(value) ? JSON.parse(value) : value;
        }

        return undefined;
    },

    textarea: (element) => {
        if (element) {
            const valueAsString = element.value.trim() || undefined;
            return validations.isJSONString(valueAsString) ? JSON.parse(valueAsString) : valueAsString;
        }

        return undefined;
    },

    select: (element) => {
        if (element && element.type && element.type === "select-one" && element.value) {
            const valueAsString = element.value;
            return validations.isJSONString(valueAsString) ? JSON.parse(valueAsString) : valueAsString;
        }
        if (element && element.type && element.type === "select-multiple") {
            const value = [];
            const selected = element.selectedOptions;

            selected.forEach((option) => {
                const optionValue = validations.isJSONString(option.value) ? JSON.parse(option.value) : option.value;
                value.push(optionValue);
            });

            return value;
        }

        return undefined;
    },

    button: (element) => {
        if (element) {
            const valueAsString = element.value.trim() || undefined;
            return validations.isJSONString(valueAsString) ? JSON.parse(valueAsString) : valueAsString;
        }
        return undefined;
    },
};

export default getValueOfElement;
