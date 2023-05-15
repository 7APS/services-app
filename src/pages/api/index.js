
import Cookies from 'js-cookie';

export const baseURL = "https://spring-boot-webhook-whatsapp.herokuapp.com/api";

const token = Cookies.get('token');

export const headerValue = {
    headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
}

export const fetcher = (params) => {
    const [url, headerValue] = params;
    return fetch(url, headerValue).then((res) => res.json())
};

export async function sendRequest(url, { arg }) {
    return fetch(url, {
        method: arg?.id != null ? 'PUT' : 'POST',
        body: JSON.stringify(arg),
        ...headerValue,
    }).then(res => {
        try {
            if (res.status !== 204) { // @TODO ajustar back para sempre vir um json !? no @PUT
                return res?.json();
            }
        } catch (e) {
            return res;
        }
    })
}
