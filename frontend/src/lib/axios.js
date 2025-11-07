import axios from "axios";

export const axiosIntance = axios.create({
    baseURL: import.meta.env.NODE === "development" ? "http://localhost:3003/api" : "https://matchat-jepjc.sevalla.app/api",
    withCredentials: true
})
