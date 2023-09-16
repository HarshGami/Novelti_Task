import React, { useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { setView, setRemoveUser } from "../features/screen/screenSlice";
import { deleteUser } from "../features/user/userSlice";

function ViewDeleteUser() {
  const userData = useSelector((state) => state.screen.userData);
  const view = useSelector((state) => state.screen.view);

  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();

  const close = () => {
    setOpen(false);
    dispatch(setView(false));
    dispatch(setRemoveUser(false));
  };

  const deleteExited = (e) => {
    e.preventDefault();
    dispatch(deleteUser(userData));
    close();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={(e) => close()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="w-full sm:col-span-12 lg:col-span-12">
                      {view ? (
                        <h2 className="border-b-2 border-gray-900/10 pb-3 text-2xl font-bold text-gray-900 sm:pr-12">
                          Details of User
                        </h2>
                      ) : (
                        <h2 className="border-b-2 border-gray-900/10 pb-3 text-2xl font-bold text-gray-900 sm:pr-12">
                          Delete User
                        </h2>
                      )}

                      <section aria-labelledby="options-heading">
                        <form>
                          <div className="space-y-10">
                            <div className="border-b border-gray-900/10 pb-6">
                              <div className="w-full mt-3 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                  <dt className="text-base font-medium leading-6 text-gray-900">
                                    First name
                                  </dt>
                                  <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {userData.firstName}
                                  </dd>
                                </div>

                                <div className="sm:col-span-3">
                                  <dt className="text-base font-medium leading-6 text-gray-900">
                                    Last name
                                  </dt>
                                  <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {userData.lastName}
                                  </dd>
                                </div>

                                <div className="sm:col-span-3">
                                  <dt className="text-base font-medium leading-6 text-gray-900">
                                    Email Address
                                  </dt>
                                  <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {userData.email}
                                  </dd>
                                </div>

                                <div className="sm:col-span-3">
                                  <dt className="text-base font-medium leading-6 text-gray-900">
                                    Mobile
                                  </dt>
                                  <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {userData.mobile}
                                  </dd>
                                </div>

                                <div className="col-span-full">
                                  <dt className="text-base font-medium leading-6 text-gray-900">
                                    Address 1
                                  </dt>
                                  <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {userData.address1}
                                  </dd>
                                </div>

                                <div className="col-span-full">
                                  <dt className="text-base font-medium leading-6 text-gray-900">
                                    Address 2
                                  </dt>
                                  <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {userData.address2}
                                  </dd>
                                </div>

                                <div className="sm:col-span-2">
                                  <dt className="text-base font-medium leading-6 text-gray-900">
                                    State
                                  </dt>
                                  <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {userData.state}
                                  </dd>
                                </div>

                                <div className="sm:col-span-2">
                                  <dt className="text-base font-medium leading-6 text-gray-900">
                                    Country
                                  </dt>
                                  <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {userData.country}
                                  </dd>
                                </div>

                                <div className="sm:col-span-2">
                                  <dt className="text-base font-medium leading-6 text-gray-900">
                                    ZIP / Postal code
                                  </dt>
                                  <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {userData.pinCode}
                                  </dd>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            {view ? (
                              <button
                                type="reset"
                                onClick={(e) => close()}
                                className="rounded-md bg-gray-600 px-5 py-2 text-base font-semibold text-white shadow-sm"
                              >
                                Close
                              </button>
                            ) : (
                              <button
                                type="reset"
                                onClick={(e) => deleteExited(e)}
                                className="rounded-md bg-red-600 px-5 py-2 text-base font-semibold text-white shadow-sm"
                              >
                                Delete User
                              </button>
                            )}
                          </div>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ViewDeleteUser;
