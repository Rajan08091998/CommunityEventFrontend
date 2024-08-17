
import { ACCESS_TOKEN } from "./constants";
import api from "./api";
import { jwtDecode } from "jwt-decode";

async function getUser() {
    try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            throw new Error("No access token found.");
        }
        
        const decoded = jwtDecode(token);
        const response = await api.get(`/api/v1/users/${decoded.user_id}/?format=json`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; // Optionally rethrow the error or handle it as needed
    }
}

export default getUser;
