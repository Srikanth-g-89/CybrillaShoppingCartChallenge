const ItemModel = require('./item.model')
const taskrouter = require('./item.router')
const PromotionModel = require('../../common/models/promotion.model')

const SaveNewItem = async(req,res) => {
    try {
        console.log('Inside Save New item function')
        console.log(req.body)
        let itemdata = {itemId: req.body.itemId,itemPrice:req.body.itemPrice}
        let savetaskdata = new ItemModel(itemdata)
        await savetaskdata.save()        
        res.send ({statusCode:200,data:'New Item Saved'})
    } catch (err) {
        console.error(err)
        res.send ({statusCode:422,data:'Error Saving New Item'})
    }
}

const GetItemList = async(req,res) => {
    try {
        console.log('Inside Get item function')
        let itemdata = await ItemModel.find({}).lean()     
        res.send ({statusCode:200,data: itemdata})
    } catch (err) {
        console.error(err)
        res.send ({statusCode:422,data: []})
    }
}

const DeleteTask = async(req,res) => {
    try {
        console.log('Inside Delete task function',req.body)
        await ItemModel.findOneAndDelete({username:req.body.username,taskId:parseInt(req.body.taskId)})
        res.send ({statusCode:200,data:'Remove Successful'})
    } catch (err) {
        console.error(err)
    }
}


const CheckOut = async(req,res) => {
    try {
        console.log('Inside Checkout function',req.body) 
        let cart = req.body.shoppingCart
        totalCartValue = cart.totalValue
        console.log('cart===',cart)
        for (let i=0;i<cart.Items.length;i++) {
            let promoItem = await ItemModel.findOne({itemId:cart.Items[i].itemId}).lean()
            if (promoItem && promoItem.promotionalIds.length>0){
                for (j=0;j<promoItem.promotionalIds.length;j++) {
                    let doc = await PromotionModel.findOne({PromotionalId:promoItem.promotionalIds[j]}).lean()
                    if (doc && doc.OneToOneCount<=cart.Items[i].itemQuantity) {
                        let div = Math.floor(cart.Items[i].itemQuantity / doc.OneToOneCount)
                        let newValue = div * doc.OneToOneValue
                        let val = (cart.Items[i].itemQuantity - (div * doc.OneToOneCount)) * promoItem.itemPrice
                        newValue = newValue + val
                        totalCartValue = totalCartValue-(cart.Items[i].itemValue - newValue)
                    }
                }                
            }
        }
        res.send ({statusCode:200,finalcartValue:totalCartValue})
    } catch (err) {
        console.error(err)
    }
}

const createPromotion = async(req,res) => {
    try {
        console.log('Inside createPromotion function',req.body)
        let promoId = await findMaxPromotionId()
        console.log('promotional id ==',promoId)
        let data = req.body
        data.PromotionalId = promoId
        let savetaskdata = new PromotionModel(data)
        await savetaskdata.save()
        let promoArray=[]
        promoArray.push(promoId)
        let update = {promotionalIds:promoArray}
        let doc = await ItemModel.findOneAndUpdate({itemId:req.body.onItem}, update);      
        res.send ({statusCode:200,data:'Promotional Item Addition Successful'})
    } catch (err) {
        console.error(err)
        res.send ({statusCode:422,data:'Could Not create promotion'})
    }
}

const findMaxPromotionId= async () => {
    try{
        let ids = await PromotionModel.findOne({}).sort({PromotionalId:'desc'})
        let idVal=0
        console.log('ids====',ids)
        if (ids==null) {
            idVal = 1
        }else {
            console.log('Promo id=====',ids.PromotionalId)
            idVal= ids.PromotionalId + 1            
        }
        return Promise.resolve(idVal)
    } catch(err) {
        console.error(err)
        return Promise.reject()
    }
} 

const Item = {
    SaveNewItem : SaveNewItem,
    GetItemList: GetItemList,
    DeleteTask: DeleteTask,
    CheckOut:CheckOut,
    createPromotion:createPromotion
}
module.exports = Item