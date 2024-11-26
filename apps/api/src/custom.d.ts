type User = {
  id: number;
  email: string;
  otp: string;
};
declare namespace Express {
  export interface Request {
    user?: User;
  }
}
