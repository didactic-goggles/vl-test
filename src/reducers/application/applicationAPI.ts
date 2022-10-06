import axios from 'axios';


export function fetchAllReq() {
  return axios.get('/products');
}
