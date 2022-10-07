export interface User {
  username: string;
}

export interface UserLoginPayload {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  username: string;
  session: string;
}

export interface UserLoginError {
  message: string;
}

export interface UserRegisterPayload {
  username: string;
  // firstname: string;
  // lastname: string;
  // email: string;
  password: string;
}
