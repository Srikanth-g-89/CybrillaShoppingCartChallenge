import React, { Component, useState } from "react";
import axios from 'axios'

class CreatePromotion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onItem:'',
            OneToOne:'Y',
            OneToMany:'N',
            OneToOneCount:0,
            OneToManyCount:{},
            OneToManyCartValue:0,
            OneToOneValue:0
        }
        this.setOnItem=this.setOnItem.bind(this)
        this.setOnOneToOne=this.setOnOneToOne.bind(this)
        this.setOneToOneCount=this.setOneToOneCount.bind(this)
        this.setOneToOneValue=this.setOneToOneValue.bind(this)
        this.createPromotional=this.createPromotional.bind(this)
}

setOnItem=(item)=> {
    this.setState({onItem:item})
}

setOnOneToOne=(item)=> {
    this.setState({OneToOne:item})
}

setOneToOneCount=(item)=> {
    this.setState({OneToOneCount:item})
}
setOneToOneValue=(item) => {
    this.setState({OneToOneValue:item})
}

createPromotional=async()=> {
    try {
        let response = await axios.post('http://localhost:8000/item/createPromotion',this.state)
        this.props.history.push('/marketing')
    } catch(err) {
        console.log(err)        
    }

}
    render() { 
        //if (this.props.location.state.isloggedIn && this.props.location.state.username.toString().toLowerCase() === 'marketing') {
            return ( <div>
                <h2>Create Promotional Items Below:</h2><br/><br/>
                Item Name:<input type="Text" value={this.state.onItem} onChange={(e) =>this.setOnItem(e.target.value)}/><br/><br/>
                One To One Flag: <input type="Text" value={this.state.OneToOne} onChange={(e) =>this.setOnOneToOne(e.target.value)}/> <span> /* Use this when the promotion is on same Item ..Expected Value Y or N */</span><br/><br/>
                Count of Items: <input type="Number" value={this.state.OneToOneCount} onChange={(e) =>this.setOneToOneCount(e.target.value)}/> <span> /* Use this for the count when promotion is on same Item */</span><br/> <br/>              
                Discount Value for the Item: <input type="Number" value={this.state.OneToOneValue} onChange={(e) =>this.setOneToOneValue(e.target.value)}/> <span> /* Use this for the item value when promotion is on same Item */</span><br/><br/>
                <input type="button" value="Create Promotional Item" onClick={this.createPromotional}/>  
                <span>{this.state.promotionText}</span>           
            </div> );
        /*} else {
            console.log('props==',this.props)
            return (<div>You must be logged In or must have Marketing login to access this page</div>)
        }*/

    }
}
 
export default CreatePromotion;