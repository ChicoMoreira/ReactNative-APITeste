import axios from "axios";

const api = axios.create({
    /*baseURL: "http://192.168.0.7:3000/"*/
    baseURL: "http://api.github.com"
})



const apiGit = axios.create({
    baseURL: "api.github.com"
})

export default api;