const axios = require("axios");

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/",
});

module.exports = axiosClient;
