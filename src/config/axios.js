import axios from "axios"

const baseURL = 'http://localhost:5000';

const USER_ID = 123;

const axiosClient = axios.create({
    baseURL,
    headers:{
        'x-user-id' : USER_ID,
    }
})

export default axiosClient