import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import ListUsers from "./components/ListUsers";
import CreateEditUser from "./components/CreateEditUser";
import ViewDeleteUser from "./components/ViewDeleteUser";

function App() {
  const [view, setView] = useState(false);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <>
      <NavBar />
      <ListUsers
        setEdit={setEdit}
        setUserData={setUserData}
        setView={setView}
        setDeleteUser={setDeleteUser}
        setCreate={setCreate}
      />
      {edit || create ? (
        <>
          <CreateEditUser
            userData={userData}
            setUserData={setUserData}
            edit={edit}
            setEdit={setEdit}
            create={create}
            setCreate={setCreate}
          />
        </>
      ) : (
        <></>
      )}
      {view || deleteUser ? (
        <>
          <ViewDeleteUser
            userData={userData}
            view={view}
            setView={setView}
            deleteUser={deleteUser}
            setDeleteUser={setDeleteUser}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
