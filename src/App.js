import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import ListUsers from "./components/ListUsers";
import CreateEditUser from "./components/CreateEditUser";
import ViewDeleteUser from "./components/ViewDeleteUser";
import { useSelector } from "react-redux";

function App() {
  const view = useSelector((state) => state.screen.view);
  const create = useSelector((state) => state.screen.create);
  const edit = useSelector((state) => state.screen.edit);
  const removeUser = useSelector((state) => state.screen.removeUser);

  return (
    <>
      <NavBar />
      <ListUsers />
      {edit || create ? <CreateEditUser /> : null}
      {view || removeUser ? <ViewDeleteUser /> : null}
    </>
  );
}

export default App;
