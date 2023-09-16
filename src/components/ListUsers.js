import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setView,
  setCreate,
  setEdit,
  setRemoveUser,
  setUserData,
} from "../features/screen/screenSlice";

function ListUsers() {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  const viewUser = (e, index) => {
    e.preventDefault();
    dispatch(setUserData({ ...users[index], id: index }));
    dispatch(setView(true));
  };

  const createUser = (e) => {
    e.preventDefault();
    dispatch(setCreate(true));
  };

  const editUser = (e, index) => {
    e.preventDefault();
    dispatch(setUserData({ ...users[index], id: index }));
    dispatch(setEdit(true));
  };

  const deleteUser = (e, index) => {
    e.preventDefault();
    dispatch(setUserData({ ...users[index], id: index }));
    dispatch(setRemoveUser(true));
  };

  return (
    <div>
      <div className="flex w-10/12 m-auto justify-between gap-x-6 py-5">
        <h3 className="flex text-base text-xl items-center font-semibold leading-6 text-gray-900">
          User Data
        </h3>
        <button
          type="submit"
          onClick={(e) => createUser(e)}
          className="rounded-md bg-indigo-600 px-5 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create User
        </button>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {users.map((user, index) => (
          <li
            key={index}
            className="flex w-10/12 border-t-2 m-auto justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-lg font-semibold leading-6 text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="truncate text-sm leading-5 text-gray-500">
                  {user.state},{user.country}
                </p>
              </div>
            </div>
            <div className="flex items-center column-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer hover:scale-125 duration-200"
                onClick={(e) => viewUser(e, index)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="px-2"></p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer hover:scale-125 duration-200"
                onClick={(e) => editUser(e, index)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <p className="px-2"></p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer hover:scale-125 duration-200"
                onClick={(e) => deleteUser(e, index)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListUsers;
