import axios from 'axios';
const deployment = 'https://mychatapplicationmern.herokuapp.com/';
const dev = 'http://localhost:2000';
const instance = axios.create({
	baseURL: dev,
	withCredentials: true,
});

export default instance;
