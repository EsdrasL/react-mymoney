import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-money-d9569.firebaseio.com/'
});

export default instance;