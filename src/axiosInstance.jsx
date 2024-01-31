import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://control.karaads.com',
});

export default instance;
