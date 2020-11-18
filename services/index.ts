import axios from 'axios';

export const API =  axios.create({
  baseURL: `http://localhost:1337/`,
  headers: {'Content-Type': 'application/json'}
});
