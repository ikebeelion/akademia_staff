import axios from 'axios'

let Api = axios.create({
    // baseURL: "https://akademiaapi.herokuapp.com/api",
    baseURL: "https://akademia.powerfields.ng/api",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('stafftoken') 
    },
})

Api.defaults.withCredentials = true

export default Api
