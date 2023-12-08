import axios from 'axios';
const API_ROOT = 'https://greenvelvet.alwaysdata.net/pfc';
const YOUR_TOKEN = 'ad7b2a929d41707b607aba023077073b873cd794'; 

const axiosInstance = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    'token': YOUR_TOKEN,
  },
});

export const addChecklist = async (newChecklist) => {
  try {
    const response = await axiosInstance.post('/checklist/add', newChecklist);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la checklist : ', error);
    throw error;
  }
};

export const fetchAllChecklists = async () => {
  try {
    const response = await axiosInstance.get('/checklists');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des checklists :', error);
    throw error;
  }
};

export const deleteChecklist = async (checklistId) => {
  try {
    const response = await axiosInstance.get(`/checklist/delete?id=${checklistId}`);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
};

// api.jsx
export const getChecklist = async (checklistId) => {
  try {
    const response = await axiosInstance.get(`/checklist?id=${checklistId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la checklist:', error);
    throw error;
  }
};

export const editChecklist = async (checklistId, updatedData) => {
  try {
    const response = await axiosInstance.post(`/checklist/update?id=${checklistId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la modification de la checklist :', error);
    throw error;
  }
};
export const modifyChecklistStatus = async (checklistId, newStatus) => {
  try {
    const response = await axiosInstance.get(`/checklist/statut?id=${checklistId}&statut=${newStatus}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la modification du statut de la checklist :', error);
    throw error;
  }
};
export default axiosInstance;
