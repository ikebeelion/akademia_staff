import axios from 'axios'

let Api = axios.create({
    baseURL: "https://akademiaapi.herokuapp.com/api",
    // baseURL: "http://akademia_api.test/api", 
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token') 
    },
})

Api.defaults.withCredentials = true

export default Api