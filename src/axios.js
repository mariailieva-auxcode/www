import axios from 'axios'

const API_URL = 'https://development-functions-test.netlify.app/.netlify/functions/'
// const API_URL = "http://localhost:9000/"

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})