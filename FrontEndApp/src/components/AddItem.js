import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import {render} from 'react-dom';
import { useHistory } from "react-router-dom"; 




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
  const itemId = useFormInput('');
  const itemPrice = useFormInput('');
  const history = useHistory();
  

  const Addtask = async() => {
    console.log ('Adding Task for new User')    
    setError(null);
    setLoading(true);    
    await axios.post('http://localhost:8000/item/AddNew',         
        {itemId: itemId.value,itemPrice:itemPrice.value}).then(async(response) => {
        console.log(response)
      setLoading(false) 
      await axios.post('http://localhost:8000/item/list').then(response => {
          console.log(response)           
        }).catch(error => {
          setLoading(false);
          console.error(error) 
          setError("Something went wrong. Please try again later.");
        }); 
        let data = {
          data:response.data.data
      }
        history.push("/viewtask",{data:data})   
       //history.push("/viewtask",{username:username})      
    }).catch(error => {
      setLoading(false);
      console.error(error)
       setError("Something went wrong. Please try again later.");
    });
  }
 

  const newTaskTemplate = (
    <div>
      <h1>Add New Item</h1><br /><br />
      <div>
        Item Id<br />
        <input type="Text" {...itemId} />
      </div>
      <div style={{ marginTop: 10 }}>
        Item Price<br />
        <input type="Number" {...itemPrice} />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Add Item'} onClick={Addtask} disabled={loading} /><br />            
    </div>
  )

  //if (props && props.location && props.location.state && props.location.state.isLoggedIn && props.location.state.username ) {
    return (newTaskTemplate)
  /*} else {
    return (<div>User Must be logged in to view this page</div>);
  }*/

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
