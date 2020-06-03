const defaultPageData = {
    siteUrl: process.env.REACT_APP_DOMAIN,
    htmlAttribute: {
        lang: localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_LANGUAGE) || "en",
        itemscope: undefined,
        itemtype: "http://schema.org/WebPage",
    },
    title: "RK React boilerplate",
    description: "RKallan React Boilerplaite for new projects",
    separator: "|",
};

export default defaultPageData;
