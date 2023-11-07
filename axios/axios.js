import axios from "axios";

export const Axios = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export const MembersAxios = axios.create({
  baseURL: process.env.MEMBERS_API_BASE_URL,
});
