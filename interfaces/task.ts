export type TaskType = {
  created_at: string;
  description: string;
  id: number;
  is_complete: boolean;
  name: string;
  position: number;
  user_id: 1;
};

export type TaskParamsType = {
  is_complete?: boolean;
  sort?: 'is_complete ASC' | 'is_complete DESC' | 'id ASC' | 'id DESC';
  offset?: number;
  limmit?: number;
};

export type TaskFormType = {
  name: string;
  description: string;
  is_complete?: boolean;
};