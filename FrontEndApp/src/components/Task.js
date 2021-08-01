import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import {render} from 'react-dom';
import { useHistory } from "react-router-dom"; 
import ViewTask from './ViewTask'



function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Task(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const taskId = useFormInput(0);
  const taskname = useFormInput('');
  const history = useHistory();
  console.log('props in task =',props)

  const Addtask = async() => {
    console.log ('Adding Task for new User')    
    setError(null);
    setLoading(true); 
    const username = props.location.state.username
    await axios.post('http://localhost:8000/task/AddNew',         
        { username: username, taskId: taskId.value,taskName:taskname.value}).then(async(response) => {
        console.log(response)
      setLoading(false) 
      await axios.post('http://localhost:8000/task/list',         
          { username: username}).then(response => {
          console.log(response)           
        }).catch(error => {
          setLoading(false);
          console.error(error) 
          setError("Something went wrong. Please try again later.");
        }); 
        let data = {
          data:response.data.data
      }
        history.push("/viewtask",{username:username,data:data})   
       //history.push("/viewtask",{username:username})      
    }).catch(error => {
      setLoading(false);
      console.error(error)
       setError("Something went wrong. Please try again later.");
    });
  }

  const newTaskTemplate = (
    <div>
      Add New Task<br /><br />
      <div>
        Task Id<br />
        <input type="number" {...taskId} />
      </div>
      <div style={{ marginTop: 10 }}>
        Task Name<br />
        <input type="Text" {...taskname} />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'AddTask'} onClick={Addtask} disabled={loading} /><br />            
    </div>
  )

  if (props && props.location && props.location.state && props.location.state.signup && props.location.state.username ) {
    return (newTaskTemplate)
  } else {
    return (<div>User Must be logged in to view this page</div>);
  }

}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
