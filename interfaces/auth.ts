import { UserType } from './user';

export type SignUpFormType = {
  username: string;
  email: string;
  name: string;
  password: string;
  confirm_password: string;
};

export type SignInFormType = {
  username_or_email: string;
  password: string;
};
export type SignIpResponseType = {
  token: string;
  user: UserType;
};
