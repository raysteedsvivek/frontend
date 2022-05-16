import request from "../services/request";
import { API_BASE_URL } from "../services/constant";

export const getAllEmployees = () => request(`${API_BASE_URL}/getEmployees`, {
    method: "GET"
});

export const getEmployeeById = (id) => request(`${API_BASE_URL}/getEmployee/${id}`, {
    method: "GET"
});


export const addEmployee = (data) => request(`${API_BASE_URL}/addEmployee`, {
    method: "POST", data
});

export const updateEmployee = (data) => request(`${API_BASE_URL}/updateEmployee`, {
    method: "PUT", data
});

export const deleteEmployee = (data) => request(`${API_BASE_URL}/deleteEmployee`, {
    method: "DELETE", data
});






