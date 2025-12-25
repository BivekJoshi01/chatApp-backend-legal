import axios from "axios";

const thirdPartyApi = axios.create({
  baseURL: process.env.THIRD_PARTY_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default thirdPartyApi;
