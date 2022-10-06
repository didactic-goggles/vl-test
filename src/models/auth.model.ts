export interface User {
  name: string;
  email: string;
}

export interface UserLoginPayload {
  username: string;
  password: string;
}

export interface UserRegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserLoginResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
