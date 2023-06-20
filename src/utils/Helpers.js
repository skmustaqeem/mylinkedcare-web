import moment from "moment"
export const CURRENT_USER = (key = "USER") => {
    if (typeof window !== 'undefined' && localStorage && !!localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key))
    }
    return null
}

export const CLEAR_STORAGE = () => {
    if (typeof window !== 'undefined' && localStorage) {
         localStorage.clear("");
    }
}

export const replaceDoubleBraces = (str, result) => {
    // console.log("replaceDoubleBraces", str, result);

    Object.keys(result).forEach(key => {
        if (result[key] === undefined) {
            result[key] = '';
        }
    });
    // console.log("result", result)

    const modifiedString = str.replace(/{{(.+?)}}/g, (_, g1) => `${result[g1]}` || g1);
    // console.log('FINAL', modifiedString.replace(/\[missing /g, '').replace(/ value\]/g, ''))
    return modifiedString.replace(/\[missing /g, '').replace(/ value\]/g, '');
};

export function setCookie(name, value, minutes) {
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
    var nameEQ = name + "=";
    var dca = document.cookie.split(';');
    for (var ca of dca) {
        var c = ca;
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
export function concateDateTime(date,time) {
    const d =(moment(date).format("YYYY-MM-DD"))
    const t = (moment(time).format("HH:mm:ss"))
    const concatenatedDateTime = moment(d + ' ' + t).format('YYYY-MM-DD HH:mm:ss')
    return moment.utc(concatenatedDateTime).format()
}