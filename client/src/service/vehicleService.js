import axios from "axios";
import { url } from "../config/config";
import { toast } from 'sonner';

const API = 'http://localhost:8082/api/vehicle'

const getConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const getAllVehicles = async (token) => {
    const config = getConfig(token);
    try {
        const response = await axios.get(`${API}/all`, config)
        toast.info(`vehicles found`)
        return response;

    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

const getQrString = async (token, vehiNo) => {
    const config = getConfig(token);

    try {
        const response = await axios.put(`${API}/reset-qrcode?vehicleNo=${vehiNo}`, config)
        return response;

    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

const setVehicle = async (token, data) => {
    const config = getConfig(token);

    try {
        const response = await axios.post(`${API}/create`, data, config)
        return response;

    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

export { getAllVehicles, getQrString, setVehicle }