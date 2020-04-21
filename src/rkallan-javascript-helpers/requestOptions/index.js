const requestOptions = (bodyOptions = {}, apiRequestOptions = {}) => {
    const body =
        ["post", "put"].indexOf(apiRequestOptions.method.toLowerCase()) !== -1
            ? JSON.stringify({
                  ...bodyOptions,
              })
            : null;

    const options = {
        ...apiRequestOptions,
        body,
    };

    return options;
};

export default requestOptions;
