import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-app-caa69.firebaseio.com/'
});

export default instance;