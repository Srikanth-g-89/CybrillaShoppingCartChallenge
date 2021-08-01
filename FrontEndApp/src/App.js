import React, { useState, useRef, useEffect } from "react";
import Task from "./components/Task";
import Login from "./components/Login"
import ViewTask from "./components/ViewTask"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'


function App(props) {
  return(
    <Router>
      <div>
      <Route path="/task" component={Task} />
      <Route path="/viewtask" component={ViewTask} />
      <Route path="/login" component={Login} />        
      </div>    
    </Router>
  );

 
}

export default App;
