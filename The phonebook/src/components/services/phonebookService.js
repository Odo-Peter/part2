import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = async () => {
  const request = axios.get(baseUrl);
  const res = await request;
  return res.data;
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const res = await request;
  return res.data;
};

const toBeDeleted = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const res = await request;
  return res.status;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const res = await request;
  return res.data;
};

const PhoneService = { getAll, create, toBeDeleted, update };

export default PhoneService;
