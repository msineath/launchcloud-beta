import Cookies from 'js-cookie';

export async function csrfFetch(url, options={}) {
    options.headers = options.headers || {};
    options.method = options.method || 'GET';

    if(options.method.toUpperCase() !== 'GET') {
        options.headers['Content-type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    const res = await window.fetch(url, options);

    if(res.status >= 400) {
    console.log(res)
     throw res;
    }
    return res;
}

export function restoreCSRF() {
    return csrfFetch('api/csrf/restore');
}