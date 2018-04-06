import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-d41a0.firebaseio.com/'
});

export default instance;