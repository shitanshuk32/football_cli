const axios = require("axios");
const { API_BASE_URL } = require("./api");

const http = axios.create({
  baseURL: API_BASE_URL, // Base URL which is https://footy-backend-6iew.onrender.com
  //   timeout: 10000, // 10 seconds
});

module.exports = http;
