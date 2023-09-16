import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition, Combobox } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { createNew, editUser } from "../features/user/userSlice";
import { setCreate, setEdit } from "../features/screen/screenSlice";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function CreateEditUser({ apiData }) {
  const countryData = apiData;
  const [selected, setSelected] = useState(countryData[0]);
  const [query, setQuery] = useState("");

  const filteredcountryData =
    query === ""
      ? countryData
      : countryData.filter((person) =>
          person
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const userData = useSelector((state) => state.screen.userData);
  const create = useSelector((state) => state.screen.create);

  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(userData);

  const dispatch = useDispatch();

  const close = () => {
    setOpen(false);
    dispatch(setEdit(false));
    dispatch(setCreate(false));
  };

  const createUser = (e) => {
    e.preventDefault();
    dispatch(createNew(user));
    close();
  };

  const editExited = (e) => {
    e.preventDefault();
    dispatch(editUser(user));
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
                      {create ? (
                        <h2 className="text-2xl border-b-2 border-gray-900/10 pb-3 font-bold text-gray-900 sm:pr-12">
                          Create New User
                        </h2>
                      ) : (
                        <h2 className="text-2xl border-b-2 border-gray-900/10 pb-3 font-bold text-gray-900 sm:pr-12">
                          Edit User
                        </h2>
                      )}

                      <section aria-labelledby="options-heading">
                        <form>
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-6">
                              <div className="w-full mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    First name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="first-name"
                                      id="first-name"
                                      value={user.firstName}
                                      onChange={(e) =>
                                        setUser({
                                          ...user,
                                          firstName: e.target.value,
                                        })
                                      }
                                      autoComplete="given-name"
                                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    Last name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="last-name"
                                      id="last-name"
                                      value={user.lastName}
                                      onChange={(e) =>
                                        setUser({
                                          ...user,
                                          lastName: e.target.value,
                                        })
                                      }
                                      autoComplete="family-name"
                                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="email"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    Email address
                                  </label>
                                  {create ? (
                                    <div className="mt-2">
                                      <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={user.email}
                                        onChange={(e) =>
                                          setUser({
                                            ...user,
                                            email: e.target.value,
                                          })
                                        }
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                      />
                                    </div>
                                  ) : (
                                    <div className="mt-2">
                                      <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={user.email}
                                        onChange={(e) =>
                                          setUser({
                                            ...user,
                                            email: e.target.value,
                                          })
                                        }
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                        disabled
                                      />
                                    </div>
                                  )}
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="mobile"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    Mobile
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      id="mobile"
                                      name="mobile"
                                      type="tel"
                                      value={user.mobile}
                                      onChange={(e) =>
                                        setUser({
                                          ...user,
                                          mobile: e.target.value,
                                        })
                                      }
                                      autoComplete="mobile"
                                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="address-1"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    Address 1
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="address-1"
                                      id="address-1"
                                      value={user.address1}
                                      onChange={(e) =>
                                        setUser({
                                          ...user,
                                          address1: e.target.value,
                                        })
                                      }
                                      autoComplete="address-1"
                                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="address-2"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    Address 2
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="address-2"
                                      id="address-2"
                                      value={user.address2}
                                      onChange={(e) =>
                                        setUser({
                                          ...user,
                                          address2: e.target.value,
                                        })
                                      }
                                      autoComplete="address-2"
                                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="region"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    State
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="region"
                                      id="region"
                                      value={user.state}
                                      onChange={(e) =>
                                        setUser({
                                          ...user,
                                          state: e.target.value,
                                        })
                                      }
                                      autoComplete="address-level1"
                                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="country"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    Country
                                  </label>
                                  <Combobox
                                    value={selected}
                                    onChange={setSelected}
                                  >
                                    <div className="relative mt-2">
                                      <div className="relative w-full border-2 cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                        <Combobox.Input
                                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                          displayValue={""}
                                          onChange={(event) =>
                                            setQuery(event.target.value)
                                          }
                                        />
                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                          <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                          />
                                        </Combobox.Button>
                                      </div>
                                      <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        afterLeave={() => setQuery("")}
                                      >
                                        <Combobox.Options className="absolute mt-1 max-h-28 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                          {filteredcountryData.length === 0 &&
                                          query !== "" ? (
                                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                              Nothing found.
                                            </div>
                                          ) : (
                                            filteredcountryData.map(
                                              (person, index) => (
                                                <Combobox.Option
                                                  key={index}
                                                  className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                      active
                                                        ? "bg-teal-600 text-white"
                                                        : "text-gray-900"
                                                    }`
                                                  }
                                                  value={person}
                                                >
                                                  {({ selected, active }) => (
                                                    <>
                                                      <span
                                                        className={`block truncate ${
                                                          selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                        }`}
                                                      >
                                                        {person}
                                                      </span>
                                                      {selected ? (
                                                        <span
                                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                              ? "text-white"
                                                              : "text-teal-600"
                                                          }`}
                                                        >
                                                          <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                          />
                                                        </span>
                                                      ) : null}
                                                    </>
                                                  )}
                                                </Combobox.Option>
                                              )
                                            )
                                          )}
                                        </Combobox.Options>
                                      </Transition>
                                    </div>
                                  </Combobox>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="postal-code"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    ZIP / Postal code
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="postal-code"
                                      id="postal-code"
                                      value={user.pinCode}
                                      onChange={(e) =>
                                        setUser({
                                          ...user,
                                          pinCode: e.target.value,
                                        })
                                      }
                                      autoComplete="postal-code"
                                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            {create ? (
                              <button
                                type="submit"
                                onClick={(e) => createUser(e)}
                                className="rounded-md bg-indigo-600 px-5 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Create User
                              </button>
                            ) : (
                              <button
                                type="submit"
                                onClick={(e) => editExited(e)}
                                className="rounded-md bg-indigo-600 px-5 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Edit User
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

export default CreateEditUser;
