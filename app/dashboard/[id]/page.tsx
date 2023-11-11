'use client';

import { dateFormat } from '@/helpers/dateFormat';
import { TaskType } from '@/interfaces/task';
import { fetchTaskById } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function DetailTask({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [task, setTask] = useState<TaskType | undefined>();

  useEffect(() => {
    fetchTaskById(params.id)
      .then((result) => {
        setTask(result.data);
      })
      .catch((err) => {
        toast.error(`${err.response?.data?.errors ?? ''}`, {
          theme: 'dark',
          autoClose: 1300,
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-[70vh] items-start px-8">
      <h1 className="text-6xl font-bold mb-2">{task?.name}</h1>
      {task?.created_at && <span className="text-xs">{dateFormat(task.created_at)}</span>}
      <p className="w-full whitespace-pre-wrap mt-10 text-white text-lg">{task?.description}</p>
      <button className="mt-auto ml-auto py-2 px-10 bg-indigo-500 rounded text-white" onClick={() => router.push('/dashboard')}>Back</button>
    </div>
  );
}
