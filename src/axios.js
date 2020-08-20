import axios from 'axios'

// const API_URL = 'https://gracious-hodgkin-e6efd3.netlify.app/.netlify/functions/'
const API_URL = process.env.API_URL

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})