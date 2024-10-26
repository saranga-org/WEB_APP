import axios from "axios";
import { url } from "../config/config";
import { toast } from 'sonner';

const API = 'http://localhost:8081/api/resource'

const getConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


const sendAnOtp = async (token) => {
    const config = getConfig(token)
    try {
        return await axios.post(`${API}/otp/generate`, config)

    } catch (error) {
        console.log(error);
    }
}
export { sendAnOtp }