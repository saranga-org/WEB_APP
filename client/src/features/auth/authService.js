import axios from 'axios';
import { url } from '../../config/config';

const API_URL = `${url}/api/resource/auth/`

// add user
const register = async (userDate) => {
    const response = await axios.post(`${API_URL}register`, userDate)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// login user
const login = async (userData) => {
    const responce = await axios.post(`${API_URL}authenticate`, userData)

    if (responce.data) {
        localStorage.setItem('user', JSON.stringify(responce.data))
    }

    return responce.data
}

//Log out
const logout = () => {
    localStorage.removeItem('user')
}



const authService = {
    register, login, logout
}

export default authService