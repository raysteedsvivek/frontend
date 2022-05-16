import queryString from "query-string";

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status <= 304) {
        return response;
    }
    const errorCode = response.status;
    return response.json().then((err) => {
        throw {//eslint-disable-line
            error: err,
            errorCode,
        };
    });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
    const headers = options.headers || new Headers();
    let body;
    headers.append("X-Requested-With", "XMLHttpRequest");
    if (headers.get("Content-Type") === null) {
        headers.append("Content-Type", "application/json");
    }
    if (headers.get("Content-Type") === "multipart/form-data") {
        body = options.data;
        headers.delete("Content-Type");
    } else {
        body = JSON.stringify(options.data);
    }

    let headersToSend = {};
    if (typeof window === "undefined") {
        headers.forEach((value, key) => {
            headersToSend[key] = value;
        });
    } else {
        headersToSend = headers;
    }

    const bodyfiedOptions = { ...options, body, headers: headersToSend };

    let urlWithQueryParams = url;
    if (options.params) {
        urlWithQueryParams = `${url}?${queryString.stringify(options.params)}`;
    }

    return fetch(urlWithQueryParams, bodyfiedOptions)
        .then(checkStatus)
        .then(parseJSON);
}
