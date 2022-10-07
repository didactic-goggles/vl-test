import axios from 'axios';
import { UserLoginPayload, UserRegisterPayload } from 'models/auth.model';


export function loginReq(formData: UserLoginPayload) {
  return axios.post('/users/login', formData);
}

export function registerReq(formData: UserRegisterPayload) {
  return axios.post('/users', formData);
}

export function fetchUserReq() {
  // const storedCookie = Cookies.get('sessionId');
  // console.log(storedCookie)
  // if (storedCookie) {
  //   Cookies.set('sessionId', storedCookie);
  // }
  return axios.get('/users');
  // return false;
}
