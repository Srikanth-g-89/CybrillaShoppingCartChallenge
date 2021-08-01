import React, { Component, useState } from "react";
import axios from 'axios'
import ReactTable from "react-table"; 

class ViewTask extends Component {
    constructor(props) {
        super(props)
        this.state= {data : []}         
        this.username= props.location.state.username;
        this.deleteTask = this.deleteTask.bind(this);
        this.AddMoreTask = this.AddMoreTask.bind(this);
        this.MarkTaskComplete=this.MarkTaskComplete.bind(this)
    }   

    async getTaskList(username) {        
        try {
            let response =await axios.post('http://localhost:8000/task/list', { username: username})            
            this.setState ({data: response.data.data})
        } catch (err) {
            console.log(err)
        }
    }
    
    componentDidMount() {
        this.getTaskList(this.username);        
    }

    MarkTaskComplete(id){
        console.log('in mark complete function')
    }


    deleteTask = async(id)  => 
    { 
        try {
            let id2 = id.target.id
            let response = await axios.post('http://localhost:8000/task/delete',{ username: this.username, taskId: id2})
            this.getTaskList(this.username);
        } catch (error) {
            console.error(error)
        } 
    } 

    AddMoreTask = () => {
        this.props.history.push('/task',{username: this.username,signup:true})
    }

    render() {             
        return (
            <div>
            <h3 > Task List</h3>  
             <table border = "1">
               <thead>
                   <tr>
                 <th>Task Id</th>
                 <th>Task Details</th>
                 <th>Task Action</th>
                 <th>Mark as Complete</th>
                 </tr>
               </thead>
    
               {
                   this.state.data.map((item)=> {   
                    return(                                              
                       <tbody id={item.taskId}>
                        <td >{item.taskId}</td>
                        <td>{item.taskName}</td>
                        <input id={item.taskId} type="button" value= "Remove Task" onClick={(e) => this.deleteTask(e, item.id)}/>
                        <input id={item.taskId} type="checkBox" value= "Mark as Completed"   onClick={(e) => this.MarkTaskComplete(e, item.id)}/>
                     </tbody>
                     )
                   })
               }
            </table> 
            <input  type="button" value= "Add More Task" onClick={(e)=>this.AddMoreTask()}/>              
            </div>
          );
    }
}
 
export default ViewTask;




/*export default function ViewTask(props) {
    console.log('props in viewtask =',props)
    const username = props.location.state.username
    const heading = ['Task Id','Task Description'] 
    const data = props.location.state.data
    //setError(null);


        const deleteTask = async (id) => {
            console.log('id=',id.target)
            console.log('id2=',id.target.id)
            let id2 = id.target.id
            await axios.post('http://localhost:8000/task/delete',         
            { username: username, taskId: id2}).then (response=> {
                console.log('Item Removed') 
            }).catch (error => {
                console.error(error)
            })
        }

    
    console.log('data is =',data)
    const viewTemplate = (
        <div>
        <h3 > Task List</h3>  
         <table border = "1">
           <tr>
             <th>Task Id</th>
             <th>Task Details</th>
           </tr>

           {
               data.map(function(item) {
                   return(                   
                   <tr id={item.taskId}>
                    <td >{item.taskId}</td>
                    <td>{item.taskName}</td>
                    <input id={item.taskId} type="button" value= "Remove Task" onClick={(e) => deleteTask(e, item.id)}/>
                 </tr>
                 )
               })
           }
        </table>               
        </div>
      );

      return viewTemplate

}*/