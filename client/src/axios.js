import axios from 'axios';
const instance = axios.create({
	baseURL: 'https://mychatapplicationmern.herokuapp.com/',
	withCredentials: true,
});

export default instance;
