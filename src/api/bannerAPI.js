import axios from 'axios'; 

import { config } from '../config';


// let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
export async function getData(params, token){
    // console.log('API', token);

    return await axios.get(`${config.api_host}/banners`, { 
    params, 
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function saveData(data, token){
    return await axios.post(`${config.api_host}/banners/store`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function editData(data, token){
    return await axios.put(`${config.api_host}/banners/update`, data, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function detailBanner(id, token){
    return await axios.get(`${config.api_host}/banners/detail/${id}`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}

export async function deleteData(id, token){
    return await axios.delete(`${config.api_host}/banners/destroy/${id}`, {
    headers: {
        'Content-Type': 'multipart/form-data', 
        'authorization': `Bearer ${token}`
    }});
}
