import axios from 'axios';
import { UserLoginPayload, UserRegisterPayload } from 'models/auth.model';

export function loginReq(formData: UserLoginPayload) {
  return axios.post('/users/login', formData);
}

export function registerReq(formData: UserRegisterPayload) {
  return axios.post('/users', formData);
}

export function fetchUserReq() {
  return axios.get('/users');
}
