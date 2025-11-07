import axios from "axios";

export const axiosIntance = axios.create({
    baseURL: import.meta.env.NODE === "development" ? "http://localhost:3003/api" : "/api",
    withCredentials: true
})
