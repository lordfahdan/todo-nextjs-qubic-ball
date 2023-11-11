'use client';

import { TaskParamsType, TaskType } from '@/interfaces/task';
import {
  fetchTaskAll,
  fetchTaskDeleteById,
  fetchTaskUpdateById,
} from '@/utils/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { dateFormat } from '@/helpers/dateFormat';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { BsArrowLeft, BsArrowRight, BsCheckCircle } from 'react-icons/bs';
import { AiFillDelete, AiFillEdit, AiOutlineCloseCircle } from 'react-icons/ai';

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState<TaskType[] | []>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState('');

  const handleClickPage = (page: number) => {
    setPage(page);
  };

  const handleComplete = (task: TaskType, is_complete: boolean) => {
    let payload = {
      name: task.name,
      description: task.description,
      is_complete,
    };
    fetchTaskUpdateById(payload, `${task.id}`)
      .then(() => {
        toast.success('Success update data!', {
          theme: 'dark',
          autoClose: 1300,
        });
        fetchTask(tab, page);
      })
      .catch(() => {
        toast.error(`Failed update data!`, {
          theme: 'dark',
          autoClose: 1300,
        });
      });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to see it again!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {
        fetchTaskDeleteById(`${id}`)
          .then(() => {
            Swal.fire('Deleted!', '', 'success').then(() => {
              fetchTask(tab, page);
            });
          })
          .catch((err) => {
            Swal.fire(
              'Failed!',
              `${err.response?.data?.errors ?? ''}`,
              'error'
            );
          });
      }
    });
  };

  const fetchTask = (tab: string = '', page: number) => {
    const meta = {
      offset: 0,
      limit: 5,
    };
    let query: TaskParamsType;
    let metaData = {
      ...meta,
      offset: page * meta?.limit,
    };
    switch (tab) {
      case '':
        query = {
          ...metaData,
        };
        break;
      case 'done':
        query = {
          is_complete: true,
          ...metaData,
        };
        break;
      case 'pending':
        query = {
          is_complete: false,
          ...metaData,
        };
        break;
      default:
        query = {
          ...metaData,
        };
        break;
    }

    fetchTaskAll(query)
      .then((result) => {
        setTasks(result.data.data);
        setTotalPage(() => {
          let total = result.data.meta?.total;
          let limit = result.data.meta?.limit;
          return Math.ceil(total / limit);
        });
      })
      .catch((err) => {
        toast.error('Failed to get tasks!', {
          theme: 'dark',
          autoClose: 1500,
        });
      });
  };

  useEffect(() => {
    fetchTask(tab, page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchTask(tab, page);
  }, [tab, page]);

  return (
    <section>
      <div className="w-full">
        <div className="py-4 px-4">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTab('')}
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <div
                  className={`py-2 px-6 rounded-full ${
                    tab === ''
                      ? 'bg-green-600'
                      : 'hover:ring-2 hover:ring-green-600'
                  }`}
                >
                  <p className="text-white">All</p>
                </div>
              </button>
              <button
                onClick={() => setTab('done')}
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <div
                  className={`py-2 px-6 rounded-full ${
                    tab === 'done'
                      ? 'bg-green-600'
                      : 'hover:ring-2 hover:ring-green-600'
                  }`}
                >
                  <p className="text-white">Done</p>
                </div>
              </button>
              <button
                onClick={() => setTab('pending')}
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <div
                  className={`py-2 px-6 rounded-full ${
                    tab === 'pending'
                      ? 'bg-green-600'
                      : 'hover:ring-2 hover:ring-green-600'
                  }`}
                >
                  <p className="text-white">Pending</p>
                </div>
              </button>
            </div>
            <button
              onClick={() => router.push('/dashboard/new')}
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-500 hover:bg-indigo-600 focus:outline-none rounded"
            >
              <p className="text-sm font-medium leading-none text-white">
                Add Task
              </p>
            </button>
          </div>

          {/* Table */}
          <div className="mt-7">
            {tasks.length > 0 && (
              <>
                <ul className="list-none w-full flex flex-col gap-4 h-[53vh] overflow-auto">
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center justify-between px-6 py-4 focus:outline-none border border-gray-100 rounded"
                    >
                      <div className="flex items-center w-full">
                        <div className="w-1/2">
                          <h5 className="text-lg font-medium leading-none mr-2 line-clamp-1 overflow-hidden">
                            {task.name}
                          </h5>
                          <span className="text-xs text-gray-400">
                            {dateFormat(task.created_at)}
                          </span>
                        </div>
                        {task.is_complete && (
                          <span className="px-2 py-1 border border-green-600 text-green-600 rounded-full text-xs">
                            Done
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="text-sm leading-none py-2 px-4 bg-cyan-700 rounded hover:bg-cyan-400 text-white focus:outline-none"
                          onClick={() => router.push(`/dashboard/${task.id}`)}
                        >
                          View
                        </button>
                        <button
                          className={`rounded-md text-sm leading-none p-2 focus:outline-none ${task.is_complete? 'bg-red-700 hover:bg-red-400' : 'bg-green-700 hover:bg-green-400'}`}
                          onClick={() =>
                            handleComplete(task, !task.is_complete)
                          }
                        >
                          {task.is_complete? <AiOutlineCloseCircle className="fill-white" /> : <BsCheckCircle className="fill-white" />}
                        </button>
                        <button
                          className="rounded-md text-sm leading-none p-2 bg-yellow-600 hover:bg-yellow-400 focus:outline-none"
                          role="button"
                          onClick={() =>
                            router.push(`/dashboard/edit/${task.id}`)
                          }
                        >
                          <AiFillEdit className="fill-white" />
                        </button>
                        <button
                          className="rounded-md text-sm leading-none p-2 bg-red-600 hover:bg-red-400 focus:outline-none"
                          role="button"
                          onClick={() => handleDelete(task.id)}
                        >
                          <AiFillDelete className="fill-white" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <ReactPaginate
                  breakLabel="..."
                  pageRangeDisplayed={1}
                  marginPagesDisplayed={2}
                  pageCount={totalPage}
                  previousLabel={
                    <div className="flex items-center gap-2 mr-4">
                      <BsArrowLeft />
                      Prev
                    </div>
                  }
                  nextLabel={
                    <div className="flex items-center gap-2 ml-4">
                      Next
                      <BsArrowRight />
                    </div>
                  }
                  onPageChange={(page) => handleClickPage(page.selected)}
                  forcePage={page}
                  renderOnZeroPageCount={() => null}
                  containerClassName="paginate-container"
                  previousLinkClassName="paginate-prev"
                  nextLinkClassName="paginate-next"
                  pageLinkClassName="paginate-item"
                  activeLinkClassName="paginate-item-active"
                  breakLinkClassName="paginate-item"
                  disabledLinkClassName="paginate-item-disabled"
                  breakClassName="paginate-break"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
