export type UserType = {
  email: string;
  id: number;
  name: string;
  username: string;
};

export type UpdateProfileFormType = {
  name: string;
  old_password: string;
  new_password: string;
};

export type UpdateProfileResponseType = UserType