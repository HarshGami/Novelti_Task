import React, { cloneElement } from "react";
import NavBar from "./components/NavBar";
import ListUsers from "./components/ListUsers";
import CreateEditUser from "./components/CreateEditUser";
import ViewDeleteUser from "./components/ViewDeleteUser";
import { useSelector } from "react-redux";
import DeleteNotification from "./components/DeleteNotification";
import CreateEditNotification from "./components/CreateEditNotification";

function App() {
  const view = useSelector((state) => state.screen.view);
  const create = useSelector((state) => state.screen.create);
  const edit = useSelector((state) => state.screen.edit);
  const removeUser = useSelector((state) => state.screen.removeUser);
  const deleteNotification = useSelector(
    (state) => state.screen.deleteNotification
  );
  const createEditNotification = useSelector(
    (state) => state.screen.createEditNotification
  );

  return (
    <>
      <NavBar />
      {deleteNotification ? <DeleteNotification /> : null}
      {createEditNotification ? <CreateEditNotification /> : null}
      <ListUsers />
      {edit || create ? <CreateEditUser /> : null}
      {view || removeUser ? <ViewDeleteUser /> : null}
    </>
  );
}

export default App;
