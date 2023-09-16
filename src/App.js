import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import ListUsers from "./components/ListUsers";
import CreateEditUser from "./components/CreateEditUser";
import ViewDeleteUser from "./components/ViewDeleteUser";
import { useSelector } from "react-redux";
import axios from "axios";

function App() {
  const view = useSelector((state) => state.screen.view);
  const create = useSelector((state) => state.screen.create);
  const edit = useSelector((state) => state.screen.edit);
  const removeUser = useSelector((state) => state.screen.removeUser);
  const [apiData, setApiData] = useState([])

  const url = "https://restcountries.com/v3.1/all"
  useEffect(() => {
    let countryData=[];
    axios.get(url).then((response) => {
      let data = response.data;
      for(let i=0;i<data.length;i++){
        countryData.push(data[i].name.common);
      }
      countryData.sort();
      setApiData(countryData);
    })
  }, [])

  // console.log(apiData)

  return (
    <>
      <NavBar />
      <ListUsers />
      {edit || create ? (
        <>
          <CreateEditUser apiData={apiData} />
        </>
      ) : (
        <></>
      )}
      {view || removeUser ? (
        <>
          <ViewDeleteUser />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
