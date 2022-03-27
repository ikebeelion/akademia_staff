import axios from 'axios'

let Api = axios.create({
    baseURL: "https://akademiapi.herokuapp.com/api"
})

Api.defaults.withCredentials = true

export default Api