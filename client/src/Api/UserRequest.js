import axios from "axios";

const API = axios.create({baseURL:"http://localhost:4000"})

export const getUser = (userId) => API.get(`/user/${userId}`);

export const updateUser = (id,FormData) => API.put(`/user/${id}`,FormData);