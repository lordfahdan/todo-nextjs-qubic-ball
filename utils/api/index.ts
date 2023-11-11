import { SignInFormType, SignUpFormType } from '@/interfaces/auth';
import { api } from './axiosInstance';
import { TaskFormType, TaskParamsType } from '@/interfaces/task';
import { UpdateProfileFormType } from '@/interfaces/user';
import { AxiosRequestConfig } from 'axios';

export const fetchSignup = ({
  username,
  name,
  email,
  password,
}: SignUpFormType) => {
  return api.post('/auth/signup', {
    username,
    name,
    email,
    password,
  });
};

export const fetchSignin = (payload: SignInFormType) => {
  return api.post('/auth/signin', payload);
};

export const fetchUser = () => {
  return api.get('/user')
}

export const fetchUpdateUser = (payload: UpdateProfileFormType, config: AxiosRequestConfig) => {
  return api.patch('/user', payload, config)
}

export const fetchTaskAll = (params: TaskParamsType = {}) => {
  return api.get('/task', {
    params,
  });
};

export const fetchTaskById = (id: string) => {
  return api.get(`/task/${id}`);
};

export const fetchTaskCreate = (payload: TaskFormType, config: AxiosRequestConfig) => {
  return api.post('/task', payload, config);
};

export const fetchTaskUpdateById = (payload: TaskFormType, id: string, config?: AxiosRequestConfig) => {
  return api.patch(`/task/${id}`, payload, config);
};

export const fetchTaskDeleteById = (id: string) => {
return api.delete(`/task/${id}`);
};
