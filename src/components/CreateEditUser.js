import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition, Combobox } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { createNew, editUser } from "../features/user/userSlice";
import {
  setCreate,
  setEdit,
  setCreateEditNotification,
} from "../features/screen/screenSlice";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Country, State } from "country-state-city";

function CreateEditUser() {
  const userData = useSelector((state) => state.screen.userData);
  const create = useSelector((state) => state.screen.create);
  const dispatch = useDispatch();

  const countryData = Country.getAllCountries();
  const allStateData = State.getAllStates();
  let countryCode = [];
  for (let i = 0; i < countryData.length; i++) {
    countryCode.push(countryData[i].isoCode);
  }
  countryCode.sort();

  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(userData);
  const [countryQuery, setCountryQuery] = useState("");
  const [stateQuery, setStateQuery] = useState("");
  const [stateData, setStateData] = useState([]);
  const [mobileCode, setMobileCode] = useState(user.mobileCode || "IN");
  const [selectedCountry, setSelectedCountry] = useState(
    userData.country || { name: "", code: "" }
  );
  const [selectedState, setSelectedState] = useState(
    userData.state || { name: "", code: "" }
  );

  useEffect(() => {
    if (selectedCountry.code !== "") {
      let temp = [];
      for (let i = 0; i < allStateData.length; i++) {
        if (allStateData[i].countryCode === selectedCountry.code) {
          temp.push(allStateData[i]);
        }
      }
      setStateData(temp);
    }
  }, [selectedCountry]);

  const filteredcountryData =
    countryQuery === ""
      ? countryData
      : countryData.filter((country) =>
          country.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(countryQuery.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredStateData =
    stateQuery === ""
      ? stateData
      : stateData.filter((state) =>
          state.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(stateQuery.toLowerCase().replace(/\s+/g, ""))
        );

  const close = () => {
    setOpen(false);
    dispatch(setEdit(false));
    dispatch(setCreate(false));
  };

  const createUser = (e) => {
    e.preventDefault();
    dispatch(
      createNew({
        ...user,
        state: selectedState,
        country: selectedCountry,
        mobileCode,
      })
    );
    dispatch(setCreateEditNotification(true));
    setOpen(false);
  };

  const editExited = (e) => {
    e.preventDefault();
    dispatch(
      editUser({
        ...user,
        state: selectedState,
        country: selectedCountry,
        mobileCode,
      })
    );
    dispatch(setCreateEditNotification(true));
    setOpen(false);
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
                        <form noValidate className="group">
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-6">
                              <div className="w-full mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    First Name*
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
                                      autoComplete="on"
                                      required
                                      pattern="[a-zA-Z]{5,}"
                                      className="peer block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                      First name should have minimum 5
                                      characters
                                    </span>
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    Last Name*
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
                                      autoComplete="on"
                                      required
                                      pattern="[a-zA-Z]{5,}"
                                      className="peer block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                      Last name should have minimum 5 characters
                                    </span>
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="email"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    Email address*
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
                                        autoComplete="on"
                                        required
                                        pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                                        className="peer block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                      />
                                      <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Please enter a valid email address
                                      </span>
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
                                        autoComplete="on"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
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
                                    Mobile*
                                  </label>
                                  <div className="relative mt-2 flex flex-row flex-wrap">
                                    <div className="w-3/12 border-r-2 border-gray-200 border-2 rounded-md flex items-center text-gray-500 px-2.5 py-2">
                                      <label
                                        htmlFor="country-code"
                                        className="sr-only"
                                      >
                                        country-code
                                      </label>
                                      <select
                                        id="country-code"
                                        name="country-code"
                                        defaultValue={mobileCode}
                                        onChange={(e) =>
                                          setMobileCode(e.target.value)
                                        }
                                        className="block w-full focus:ring-blue-600 focus:border-blue-600"
                                      >
                                        {countryCode.map((code, index) => (
                                          <option key={index} value={code}>
                                            {code}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <input
                                      type="tel"
                                      id="mobiles"
                                      name="mobile"
                                      value={user.mobile}
                                      onChange={(e) =>
                                        setUser({
                                          ...user,
                                          mobile: e.target.value,
                                        })
                                      }
                                      autoComplete="on"
                                      required
                                      pattern="^\d{10}$"
                                      className="peer py-2 px-4 border-gray-200 border-2 rounded-md block w-9/12 text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="mt-2 hidden w-full text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                      Please enter a mobile number
                                    </span>
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="address-1"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    Address 1*
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
                                      autoComplete="on"
                                      required
                                      pattern="^\S.*\S$|^.{1,2}$"
                                      className="peer block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                      Address is required
                                    </span>
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="address-2"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    Address 2 (Optional)
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
                                      autoComplete="on"
                                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="region"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    State*
                                  </label>

                                  {selectedCountry.name !== "" ? (
                                    <Combobox
                                      value={selectedState.name}
                                      onChange={setSelectedState}
                                    >
                                      <div className="relative mt-2">
                                        <div className="relative w-full border-2 cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                          <Combobox.Input
                                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                            displayValue={selectedState.name}
                                            onChange={(event) =>
                                              setStateQuery(event.target.value)
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
                                          leave="transition ease-in duration-200"
                                          leaveFrom="opacity-100"
                                          leaveTo="opacity-0"
                                          afterLeave={() => setStateQuery("")}
                                        >
                                          <Combobox.Options className="z-20 absolute mt-1 max-h-28 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {filteredStateData.length === 0 &&
                                            stateQuery !== "" ? (
                                              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                Nothing found.
                                              </div>
                                            ) : (
                                              filteredStateData.map(
                                                (state, index) => (
                                                  <Combobox.Option
                                                    key={index}
                                                    className={({ active }) =>
                                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active
                                                          ? "bg-teal-600 text-white"
                                                          : "text-gray-900"
                                                      }`
                                                    }
                                                    value={{
                                                      name: state.name,
                                                      code: state.countryCode,
                                                    }}
                                                  >
                                                    {({
                                                      selectedState,
                                                      active,
                                                    }) => (
                                                      <>
                                                        <span
                                                          className={`block truncate ${
                                                            selectedState
                                                              ? "font-medium"
                                                              : "font-normal"
                                                          }`}
                                                        >
                                                          {state.name}
                                                        </span>
                                                        {selectedState ? (
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
                                  ) : (
                                    <div className="mt-2">
                                      <input
                                        type="text"
                                        name="address-2"
                                        id="address-2"
                                        value={""}
                                        disabled
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                      />
                                      <span className="mt-2 text-sm text-red-500">
                                        Select country first
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="country"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    Country*
                                  </label>
                                  <Combobox
                                    value={selectedCountry.name}
                                    onChange={setSelectedCountry}
                                  >
                                    <div className="relative mt-2">
                                      <div className="relative w-full border-2 cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                        <Combobox.Input
                                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                          displayValue={selectedCountry.name}
                                          onChange={(event) =>
                                            setCountryQuery(event.target.value)
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
                                        leave="transition ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        afterLeave={() => setCountryQuery("")}
                                      >
                                        <Combobox.Options className="absolute mt-1 max-h-28 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                          {filteredcountryData.length === 0 &&
                                          countryQuery !== "" ? (
                                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                              Nothing found.
                                            </div>
                                          ) : (
                                            filteredcountryData.map(
                                              (country, index) => (
                                                <Combobox.Option
                                                  key={index}
                                                  className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                      active
                                                        ? "bg-teal-600 text-white"
                                                        : "text-gray-900"
                                                    }`
                                                  }
                                                  value={{
                                                    name: country.name,
                                                    code: country.isoCode,
                                                  }}
                                                >
                                                  {({
                                                    selectedCountry,
                                                    active,
                                                  }) => (
                                                    <>
                                                      <span
                                                        className={`block truncate ${
                                                          selectedCountry
                                                            ? "font-medium"
                                                            : "font-normal"
                                                        }`}
                                                      >
                                                        {country.name}
                                                      </span>
                                                      {selectedCountry ? (
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
                                  {selectedCountry.name === "" ? (
                                    <span className="mt-2 text-sm text-red-500">
                                      Please select country
                                    </span>
                                  ) : null}
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="postal-code"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                  >
                                    ZIP / Postal code*
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
                                      autoComplete="on"
                                      required
                                      pattern="^\d{6}$"
                                      className="peer block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                                    />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                      Please enter a valid zip code
                                    </span>
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
                                className={`rounded-md bg-indigo-600 px-5 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group-invalid:pointer-events-none group-invalid:opacity-30 ${
                                  selectedCountry.name === "" ||
                                  selectedState.name === ""
                                    ? "pointer-events-none opacity-30"
                                    : ""
                                }`}
                              >
                                Create User
                              </button>
                            ) : (
                              <button
                                type="submit"
                                onClick={(e) => editExited(e)}
                                className={`rounded-md bg-indigo-600 px-5 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group-invalid:pointer-events-none group-invalid:opacity-30 ${
                                  selectedCountry.name === "" ||
                                  selectedState.name === ""
                                    ? "pointer-events-none opacity-30"
                                    : ""
                                }`}
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
