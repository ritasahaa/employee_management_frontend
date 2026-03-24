// Employee Service
// IMPORTANT: This file is intentionally incomplete
// Candidates need to implement these API integration functions

import api from './api.js';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// TODO: Implement login API integration ----
export const loginUser = async (email, password) => {
  try {

    const response = await axios.post(`${API_URL}/auth/login`,{
      email,
      password,
    });
    return response.data;
  }catch(error){
    if (error.response) {
      throw  error.response.data.message || "Login failed";
    } else {
      throw "Network error, please try again";
    }
  }
};

// TODO: Implement get all employees API ----
export const getEmployees = async (params = {}) => {
  // TODO: Make GET request to /employees wit query params
  // TODO: Support search, department, status, page, limit, sortBy, order
  // TODO: Return employees list and pagination data

  try{
    const response = await axios.get(`${API_URL}/employees`,{
      params: {
        search: params.search || "",
        department: params.department || "",
        status: params.status || "",
        page: params.page || 1,
        limit: params.limit || 10,
        sortBy: params.sortBy || "createdAt",
        order: params.order || "desc"
      }
    })
    return response.data;
  }catch(error) {
    console.error("Get Employees Error");
    throw error.response?.data || error.message;
  }
};

// TODO: Implement get employee by ID API ----
export const getEmployeeById = async (id) => {
  // TODO: Make GET request to /employees/:id
  // TODO: Handle 404 if employee not found
  // TODO: Return employee data
  try{
    const response = await axios.get(`${API_URL}/employees/${id}`);
    return response.data;
  }catch(error) {
    if(error.response?.status === 404) {
      throw "Employees not found";
    }else{
      throw error.response?.data?.message || "Network error"; 
    }
  }

};

// TODO: Implement create employee API ----
export const createEmployee = async (employeeData) => {
  // TODO: Make POST request to /employees
  try {
    const response = await axios.post(`${API_URL}/employees`,employeeData);
    return response.data;
  }catch (error) {
    throw error.response?.data?.message || "Failed to create employees";
  }
};

// TODO: Implement update employee API ----
export const updateEmployee = async (id, employeeData) => {
  // TODO: Make PUT request to /employees/:id
  // TODO: Send updated employee data in request body
  // TODO: Handle validation errors and duplicate email
  // TODO: Return updated employee data
  try {
    const response = await axios.put(`${API_URL}/employees/${id}`,employeeData
    );
    return response.data;
  }catch(error) {
    throw error.response?.data?.message || "Failed to update employees";
  }
};

// TODO: Implement update employee status API ----
export const updateEmployeeStatus = async (id, status) => {
  // TODO: Make PATCH request to /employees/:id/status
  // TODO: Send { status } in request body
  // TODO: Return updated employee data
  
  try{
    const response = await axios.patch(`${API_URL}/employees/${id}/status`,{status})
    return response.data;
  }catch(error) {
   throw error.response?.data?.message || "Failed to update status";
  }
};

// TODO: Implement delete employee API
export const deleteEmployee = async (id) => {
  // TODO: Make DELETE request to /employees/:id
  // TODO: Handle 404 if employee not found
  // TODO: Return success response
  try {
    const response = await axios.delete(`${API_URL}/employees/${id}`)
    return response.data;
  }catch(error) {
    if(error.response?.status === 404) {
      throw "Employee not found";
    }
    throw error.response?.data?.message || "Deleted failed";
  }
};

