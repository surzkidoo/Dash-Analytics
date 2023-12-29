import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://white-kingfisher-wig.cyclic.app',
});

export default instance;
