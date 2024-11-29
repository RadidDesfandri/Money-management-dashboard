export interface LoginValues {
  email: string;
  password?: string;
}

export interface RegisterValues {
  email: string;
}

export interface UserType {
  email?: string;
  username: string;
  password: string;
}
