import React, { Component, useState } from "react";
import axios from 'axios'


class ViewTask extends Component {
    constructor(props) {
        super(props)
        this.state= {
            data : [],
            cartItems:[],
            itemList:{},
            totalValue:0,
            finalValue:''
        }         
        this.username= props.location.state.username;
        this.deleteTask = this.deleteTask.bind(this);
        this.AddToCart=this.AddToCart.bind(this);
        this.Checkout=this.Checkout.bind(this);
    }   

    Checkout = async(id)=> {
        try {
            let shoppingCart={}
            shoppingCart.Items=this.state.cartItems
            shoppingCart.totalValue=this.state.totalValue
            let response = await axios.post('http://localhost:8000/item/checkout',{'shoppingCart':shoppingCart})
            let val = `Final cart Value after applying all discount is : ${response.data.finalcartValue}`
            this.setState ({finalValue:val})
            console.log(this.state)
        } catch(err) {
            console.log(err)
        }
    }

    async getTaskList(username) {        
        try {
            let response =await axios.post('http://localhost:8000/item/list', {})            
            this.setState ({data: response.data.data})
            let itemer={}
            response.data.data.map((item)=> {                
                itemer[item.itemId]=item.itemPrice
            })
            this.setState ({itemList: itemer})
        } catch (err) {
            console.log(err)
        }
    }
    
    componentDidMount() {
        this.getTaskList();        
    }

    AddToCart(id){        
        if (this.state.cartItems.length == 0) {
            let arr=[]            
            arr.push({itemId:id.target.id,itemQuantity:1,itemValue:this.state.itemList[id.target.id]})
            this.state.totalValue += this.state.itemList[id.target.id]
            this.setState({
                cartItems:arr
            })
        } else {
            let arr=this.state.cartItems
            for (let i=0;i<arr.length;i++) {
                if (arr[i].itemId ==id.target.id) {
                    arr[i].itemId = id.target.id
                    arr[i].itemQuantity = arr[i].itemQuantity + 1
                    arr[i].itemValue += this.state.itemList[id.target.id]
                    this.state.totalValue += this.state.itemList[id.target.id]
                    this.setState({
                        cartItems:arr
                    })
                }
            }

        }
        
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
            <h3 > Item List</h3>  
             <table border = "1">
               <thead>
                   <tr>
                 <th>Item Id</th>
                 <th>Item Price</th>                 
                 <th>Add To Cart</th>
                 </tr>
               </thead>
    
               {
                   this.state.data.map((item)=> {   
                    return(                                              
                       <tbody >
                        <td >{item.itemId}</td>
                        <td>{item.itemPrice}</td>                        
                        <input id={item.itemId} type="button" value= "Add To Cart"   onClick={(e) => this.AddToCart(e, item.id)}/>
                     </tbody>
                     )
                   })
               }
            </table> 
            <div>
        <h4>Cart Items:</h4>
        <table border='1'>
        <thead>
           <tr>
         <th>Item Id</th>
         <th>Item Quantity</th>                 
         <th>Item Total Price</th>
         </tr>
       </thead>
            {
                this.state.cartItems.map((item)=> {   
                    return(                                              
                        <tbody id={item.itemId}>
                        <td >{item.itemId}</td>
                        <td>{item.itemQuantity}</td>  
                        <td>{item.itemValue}</td>                               
                        </tbody>
                        )
                    })
            }
        </table>
        <span> Cart Price : </span><span>{this.state.totalValue}</span><br/>
        <input  type="button" value= "Checkout"   onClick={(e) => this.Checkout(e)}/><br/><br/>
        <span style={{ color: 'red' }}>{this.state.finalValue}</span><br/><br/>
        <span>Please note:- Final total price after applying promotional values will be available after checkout </span><br/><br/>
        
    </div> 
                <div>

    </div>           
                         
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