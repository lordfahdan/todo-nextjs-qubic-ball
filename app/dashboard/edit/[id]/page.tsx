"use client"

import AddTodoForm from '@/components/AddTodoForm';
import { TaskType } from '@/interfaces/task';
import { fetchTaskById } from '@/utils/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Edit({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<TaskType | undefined>()

  useEffect(() => {
    fetchTaskById(params.id).then((result) => {
      setTask(result.data)
    }).catch((err) => {
      toast.error(`${err.response?.data?.errors ?? ''}`, {
        theme: 'dark',
        autoClose: 1300
      })
    });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Edit Todo</h1>
      <AddTodoForm id={params.id} data={task} />
    </div>
  );
}
