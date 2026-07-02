const axios = require("axios");
const { API_BASE_URL } = require("./api");
const { createSpinner } = require("../utils/spinner");
const { CONNECTING_MESSAGE } = require("../utils/messages");

const http = axios.create({
  baseURL: API_BASE_URL, // e.g. https://footy-backend-6iew.onrender.com
  // Render's free tier cold-starts can take ~30s, so keep this generous.
  // Anything longer than this is treated as "server is waking up".
  timeout: 60000,
});

// A single shared spinner, reference-counted so back-to-back requests (e.g.
// `footy live` falling through to upcoming matches) don't stack lines or leave
// a dangling animation running.
let spinner = null;
let activeRequests = 0;

const startSpinner = () => {
  activeRequests += 1;
  if (!spinner) {
    spinner = createSpinner(CONNECTING_MESSAGE).start();
  }
};

const stopSpinner = () => {
  activeRequests = Math.max(0, activeRequests - 1);
  if (activeRequests === 0 && spinner) {
    spinner.stop();
    spinner = null;
  }
};

http.interceptors.request.use((config) => {
  startSpinner();
  return config;
});

http.interceptors.response.use(
  (response) => {
    stopSpinner();
    return response;
  },
  (error) => {
    stopSpinner();
    return Promise.reject(error);
  },
);

module.exports = http;
