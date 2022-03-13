import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom';


import Home from '../components/home/Home';
import SyncPage from '../components/actionPage/SyncPage';
import FilesList from '../components/actionPage/FilesList';



function Wrapper() {
  const location = useLocation();
  return (
    <div id="myWrapper">
      <Switch location={ location } key={ location.key } >

      <Route exact path="/" component={Home} />
      <Route path="/sync" component={SyncPage} />
      <Route path="/files" component={FilesList} />
        

      </Switch>      
  </div>
  )
}

export default Wrapper
