const handleResponse = (response) => {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok || [4, 5].includes(Array.from(String(response.status), Number)[0])) {
            const error = {
                ok: response.ok,
                status: response.status,
                body: (data && data.message) || response.statusText,
            };
            return Promise.reject(error);
        }

        return data;
    });
};

export default handleResponse;
