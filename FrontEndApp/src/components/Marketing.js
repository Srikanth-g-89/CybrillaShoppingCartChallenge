import React, { Component, useState } from "react";
import axios from 'axios'

class Marketing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemList:[]            
          }
        this.addItem=this.addItem.bind(this)
        this.createPromotion=this.createPromotion.bind(this)
}

addItem = ()=> {
    this.props.history.push('/additem',this.props.location.state)
}

createPromotion = ()=>{
    this.props.history.push('/createpromotion',this.props.location.state)
}
 
    render() { 
        console.log('props in marketing==',this.props)
        return ( <div>
            <h1>Marketing Page</h1><br/>
            <input type="button" value = "Add item" onClick={this.addItem}/><br/><br/>
            <input type="button" value = "Add Promotion" onClick={this.createPromotion}/>
        </div> );
    }
}
 
export default Marketing;