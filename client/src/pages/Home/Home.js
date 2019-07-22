import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import HomeContainer from '../../components/HomeContainer/HomeContainer';
import { Redirect } from "react-router-dom";
import { AuthStore } from '../../helpers';

const Home = () => {

  if (!AuthStore.isAuthenticated()) {
    return <Redirect to={{ pathname: "/" }} />
  }

  return <>
    <Sidebar />
    <HomeContainer />
  </>
};

export default Home;
