import axios from 'axios';

const ApiManager = axios.create({
  baseURL:'http://35.90.113.221/login/',
 });


export default ApiManager;