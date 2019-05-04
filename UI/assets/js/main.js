const baseUrl = 'http://localhost:3000/api/v1';

const postRequest = async (url, data, token = null) => {
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            'X-access-token': token
        }),
    });

    let json = await response.json();
    return json;
    
}

const setCookie = (cname, cvalue, exdays) => {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));

    let expires = "expires="+ d.toUTCString();
    document.cookie = cname +"="+ cvalue +";"+ expires +";path=/";
} 

const getCookie = (cname) => {
    let name = cname +"=";
    let decodedCookie = decodeURIComponent(document.cookie);
    
    let ca = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while(c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if(c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const checkCookie = (cname) => {
    let cookie = getCookie(cname);

    if(cookie != "") {
        return true;
    } else {
        return false;
    }
}