"use strict";

var base_url = 'https://banka-ap.herokuapp.com/api/v1/';

var setBaseUrl = function setBaseUrl() {
  var url = window.location.hostname;
  console.log(url);
};

setBaseUrl();

var showMessage = function showMessage(message) {
  alert(message);
  document.write(base_url);
};