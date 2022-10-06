import axios from 'axios';

import {
  UserLoginPayload,
  UserLoginResponse,
  UserRegisterPayload
} from 'models/auth.model';

export function loginReq(formData: UserLoginPayload) {
  return axios.post('/auth/login', formData);
}

export function registerReq(formData: UserRegisterPayload) {
  return new Promise<{ data: UserLoginResponse }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: {
            user: {
              name: 'Dijwar',
              email: 'dijwar@gmail.com'
            },
            token: 'myToken'
          }
        }),
      5000
    )
  );
}

export function fetchUserReq() {
  return new Promise<{ data: UserLoginResponse }>((resolve, reject) => {
    if (!localStorage.getItem('token')) reject(false);
    resolve({
      data: {
        user: {
          name: 'Dijwar',
          email: 'dijwar@gmail.com'
        },
        token: 'myToken'
      }
    });
  });
}
