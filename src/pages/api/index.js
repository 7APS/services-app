
import Cookies from 'js-cookie';

export const baseURL = "https://spring-boot-webhook-whatsapp.herokuapp.com/api/users";

const token = Cookies.get('token');

export const headerValue = {
    headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
}

export const fetcher = (params) => {
    const [url, headerValue] = params;
    console.log("url", url);
    console.log("headerValue", headerValue);
    fetch(url, headerValue).then((res) => res.json())
};
