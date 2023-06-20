import { CURRENT_USER } from "./Helpers";

const ApiCall = async ({
    url,
    method = "GET",
    body,
    withToken = true,
    header = {},
}) => {

    const user = CURRENT_USER();

    let res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": user && withToken && user?.accessToken || null,
            ...header,
        },
        body: JSON.stringify(body),
    })

    if (res.ok && res.status === 200) {
        return await res.json();
    } else {
        if (res.status === 409) {
            res = await res.json()
            throw { ...res, statusCode: 409 }
        }
    }
};


export default ApiCall;
