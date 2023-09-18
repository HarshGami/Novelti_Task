import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  setCreate,
  setEdit,
  setCreateEditNotification,
} from "../features/screen/screenSlice";
import { useSelector, useDispatch } from "react-redux";

function CreateEditNotification() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const create = useSelector((state) => state.screen.create);

  const close = () => {
    setOpen(false);
    dispatch(setCreateEditNotification(false));
    dispatch(setEdit(false));
    dispatch(setCreate(false));
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Successful!
                    </h3>
                    <div className="mt-2 px-7 py-3">
                      {create ? (
                        <p className="text-sm text-gray-500">
                          User has been successfully added!
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          User has been successfully updated!
                        </p>
                      )}
                    </div>
                    <div className="items-center px-4 py-3">
                      <button
                        id="ok-btn"
                        onClick={(e) => close(e)}
                        className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        OK
                      </button>
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

export default CreateEditNotification;
