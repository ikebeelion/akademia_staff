import axios from 'axios'

let Api = axios.create({
    // baseURL: "https://localhost:8000/api",
    baseURL: "https://akademia.powerfields.ng/api",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('stafftoken') 
    },
})

Api.defaults.withCredentials = true

export default Api
