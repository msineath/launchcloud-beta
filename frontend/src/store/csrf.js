import Cookies from 'js-cookie';

export async function csrfFetch(url, options={}) {
    options.headers = options.headers || {};
    options.method = options.method || 'GET';
    options.credentials = 'include';

    if(options.method.toUpperCase() !== 'GET') {
        if(options.headers["Content-Type"] === "multipart/form-data") {
            delete options.headers["Content-Type"];
        } else {
            options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        }
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    const res = await window.fetch(`http://localhost:5000${url}`, options);

    if(res.status >= 400) {

    console.log('***********', res)
     throw res;
    }
    return res;
}

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}