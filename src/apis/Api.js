import axios from 'axios'

let Api = axios.create({
    baseURL: "https://akademiaapi.herokuapp.com/api"
})

Api.defaults.withCredentials = true

export default Api