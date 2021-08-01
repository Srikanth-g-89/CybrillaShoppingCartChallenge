const UserModel = require('./user.model')
const TaskModel = require('../item/item.model')
const getUser = async(req,res) => {
    try {
        console.log('reached here')
        console.log(req.body)        
        let userdata = await UserModel.findOne({username:req.body.username}).lean()
        if (userdata.password == req.body.password) {   
            res.send ({statusCode:200,data: 'Login Successful'})
        } else {
            res.send ({statusCode:422,data:'Invalid Password'})
        }
    } catch (err) {
        console.error(err)
        res.send ({statusCode:422,data:'Error in login function'})
    }
}

const SignUpUser = async(req,res) => {
    try {
        console.log('Inside SignUpUser')
        let userdata = {username: req.body.username, password: req.body.password}
        let saveuserdata = new UserModel(userdata)
        await saveuserdata.save()        
        res.send ({statusCode:200,data:'New User Saved'})
    } catch (err) {
        console.error(err)
        res.send ({statusCode:422,data:'User Exists'})
    }
}

const userdata =  {
    getUser : getUser,
    SignUpUser:SignUpUser
}

module.exports  = userdata