
let base_url = 'https://banka-ap.herokuapp.com/api/v1/';

let setBaseUrl = () => {
    let url = window.location.hostname;
    console.log(url);
}

setBaseUrl();

let showMessage = (message) => {
    alert(message);
    document.write(base_url);
}