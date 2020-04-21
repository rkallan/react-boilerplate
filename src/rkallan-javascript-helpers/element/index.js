import getType from "../getType";
import { convertToGivenSeperator } from "../convertString";

const replaceElementAttributeValue = (element, attribute, attributeValue) => {
    element.setAttribute(attribute, attributeValue);
};

const getKey = (attributeKey, isDataAttribute = false) => {
    const key = attributeKey;

    if (isDataAttribute) return "dataset";

    if (attributeKey === "class") return "className";

    return key;
};

const getValuesFromAttribute = (element, attributeKey, key, isDataAtribute = false) => {
    let valuesAsString;

    if (!element) return undefined;

    if (isDataAtribute) {
        valuesAsString = element[key][attributeKey];
    } else if (["id", "class"].includes(attributeKey)) {
        valuesAsString = element[key];
    } else if (element.hasAttribute(attributeKey)) {
        valuesAsString = element.getAttribute(attributeKey);
    }

    return valuesAsString ? valuesAsString.split(" ") : undefined;
};

const isAttributeValueExistingInArray = (attributeValue, valuesInArray) => {
    let valueIsEqual = false;
    if (valuesInArray && Array.isArray(valuesInArray)) {
        valuesInArray.forEach((value) => {
            if (value === attributeValue) {
                valueIsEqual = true;
            }
            return valueIsEqual;
        });

        return valueIsEqual;
    }
    return false;
};

const getParentElementWithAttributeValue = (element, attribute, attributeValue) => {
    const isDataAttribute = attribute.split("-")[0] === "data";
    const attributeKey = isDataAttribute ? convertToGivenSeperator(attribute.substr(5), "") : attribute;

    const key = getKey(attributeKey, isDataAttribute);

    const getParentElement = (currentElement) => {
        const newElement = currentElement.parentElement || undefined;

        if (!newElement || newElement.tagName.toLowerCase() === "body") {
            return undefined;
        }

        const valuesInArray = getValuesFromAttribute(newElement, attributeKey, key, isDataAttribute);

        const isElementFound = isAttributeValueExistingInArray(attributeValue, valuesInArray);

        if (isElementFound) {
            return newElement;
        }

        if (!isElementFound && newElement.tagName.toLowerCase() !== "body") {
            return getParentElement(newElement);
        }

        return undefined;
    };

    return getParentElement(element);
};

const getChildElementsWithState = (container = document, state = "hover") => {
    return container.querySelectorAll(`[state=${state}]`) || [];
};

const getSiblings = (element) => {
    const parentElemet = element.parentNode;
    const childElements = parentElemet.childNodes;

    const siblingElements = [...childElements].filter((number) => number !== element);

    return siblingElements;
};

const setElementState = (elements, state) => {
    if (elements && elements.length > 0) {
        elements.forEach((element) => {
            element.setAttribute("state", state);
        });
    }
};

const setStylesOnElement = (element, stylesAsObject) => {
    Object.keys(stylesAsObject).forEach((property) => {
        if (getType(stylesAsObject[property]) === "number") {
            element.style[property] = `${stylesAsObject[property] / 16}rem`;
        } else {
            element.style[property] = stylesAsObject[property];
        }
    });
};

const setAttributesOnElement = (elements, attributesAsObject) => {
    const setAttributes = (element) => {
        Object.keys(attributesAsObject).forEach((property) => {
            element.setAttribute(property, attributesAsObject[property]);
        });
    };

    if (elements.length && elements.length > 0) {
        elements.forEach((element) => {
            setAttributes(element);
        });
    } else if (elements.length === undefined) {
        setAttributes(elements);
    }
};

const enableDisableElements = (elements, disabled = true) => {
    Object.keys(elements).forEach((elementKey) => {
        elements[elementKey].disabled = disabled;
    });
};

const getPaddingStylesFromElementAsObject = (element) => {
    const paddingTop = parseInt(getComputedStyle(element).getPropertyValue("padding-top"));

    const padding = {
        y: parseInt(getComputedStyle(element).getPropertyValue("line-height")) / 2 + paddingTop,
        x: paddingTop,
        top: paddingTop,
    };

    return padding;
};

const toggleStateOnConnectedElements = (element, state, sibling = "previousSibling", connectWithId = null) => {
    if (element) {
        const connectDirection = sibling === "previousSibling" ? "connectFromId" : "connectWithId";
        const elementDataId = element.dataset.id ? element.dataset.id : element.dataset.connectFromId;
        const connectIds =
            element.dataset[connectDirection] && element.dataset[connectDirection].length > 0 ? element.dataset[connectDirection].split(",") : [];
        const dataContainer = element.closest("[variant=data-container]");
        const connectContainer = dataContainer[sibling];
        if (state === "active") dataContainer.setAttribute("state", "active");

        if (connectContainer && connectIds.length > 0 && connectWithId === null) {
            connectIds.map((id) => {
                const connectedElement = connectContainer.querySelector(`[data-id="${id}"]`);
                if (connectedElement && !["active", "disabled"].includes(connectedElement.getAttribute("state"))) connectedElement.setAttribute("state", state);

                const connectedElements =
                    sibling === "previousSibling"
                        ? connectContainer.querySelectorAll(`[data-connect-with-id="${elementDataId}"][data-connect-from-id="${id}"]`)
                        : dataContainer.querySelectorAll(`[data-connect-with-id="${id}"][data-connect-from-id="${elementDataId}"]`);

                connectedElements.forEach((currentElement) => {
                    if (!["active", "disabled"].includes(currentElement.getAttribute("state"))) currentElement.setAttribute("state", state);
                });

                return toggleStateOnConnectedElements(connectedElement, state, sibling);
            });
        } else if (connectWithId > 0) {
            const connectedElement = connectContainer.querySelector(`[data-id="${connectWithId}"]`);
            if (!["active", "disabled"].includes(connectedElement.getAttribute("state"))) connectedElement.setAttribute("state", state);
            return toggleStateOnConnectedElements(connectedElement, state, sibling);
        }
    }
    return undefined;
};

export {
    replaceElementAttributeValue,
    getParentElementWithAttributeValue,
    getChildElementsWithState,
    setElementState,
    setStylesOnElement,
    setAttributesOnElement,
    getPaddingStylesFromElementAsObject,
    toggleStateOnConnectedElements,
    enableDisableElements,
    getSiblings,
};
