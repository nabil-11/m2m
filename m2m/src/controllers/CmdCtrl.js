const { compareSync } = require("bcrypt");
const CmdModel  = require("../Models/CmdModel");
const productModel = require('../Models/ProductModel')
const UserModel = require('../Models/UserModel')
const client = require('twilio')("AC1646d8400d2e67d8250f5235114deb5a", "a3a9c723bbc31c0c70cae0c54b664f3a");
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query
  
       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
  
    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }
  
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
  
        return this;
    }
  
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 8
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
  }


const CmdCtrl ={

AddCmd : async (req,res) =>{

    const {FirstName,EnterpriseId,LastName,cin,IPC,state,city,zip,number,pSold,pPrice} = req.body;
    let UserId = req.user._id
    let etat ="attente"
try{
    let cmd = new CmdModel({
  FirstName,LastName,EnterpriseId,cin,IPC,state,city,zip,number,etat,UserId,pSold,pPrice
      });
    
       cmd .save()
        .then((data) => {
          return res.json({
            success: "command passed with success",
          });
        })
   }
   catch(error) {
       return res.json({error})
   }
},
SearchCmd : async(req, res) =>{
 
    try{
        const features = new APIfeatures( CmdModel.find({UserId:req.user._id}), req.query)
        .filtering().sorting().paginating()
        const cmd = await features.query
  
      
        if (cmd){
            let ss =cmd.length
             return res.json({msg:"hi",cmd,ss})
        }
        else{
            return res.json({msg:"error"})
        }

    }
    catch(err){
        res.json({msg:"error"})

    }
  

},
deleteCommand : async (req, res) => {
   const   CID  = req.body.CID 
   try {
    await CmdModel.findByIdAndDelete(CID)
    res.json({msg: "commande annuler"})
} catch (err) {
    return res.status(500).json({msg: err.message})
}
       
         
   

},
CmdM : async (req, res) => {
    const id = req.user._id
    try {
        const features = new APIfeatures( CmdModel.find({EnterpriseId:id}), req.query)
        .filtering().sorting().paginating()
  
        const cmd = await features.query
  
        res.json({
            status: 'success',
            result: cmd.length,
            cmd:cmd
        })
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    },
    deleteCmd :async (req, res) => {
        const {id} = req.body
         let deleteCmd = await CmdModel.findOneAndDelete({_id:id})
         if (!deleteCmd){
            return res.json({error:'error'})
         }
         else{
             return res.json({delete:"delete completed"})
         }
    },
    acceptedcommand : async (req, res) => {
             const {id} = req.body
             let acceptedcmd = await CmdModel.findOneAndUpdate({_id:id},{etat:"accepter"})
             if(!acceptedcmd){
                 return res.json({error:'error'})
             }
             else {
                 return res.json({msg: "accepted as success"})
             }
        
    },  refusedcommand : async (req, res) => {
        const {id} = req.body
        let acceptedcmd = await CmdModel.findOneAndUpdate({_id:id},{etat:"refuser"})
        if(!acceptedcmd){
            return res.json({error:'error'})
        }
        else {
            setTimeout(async() => {
                await CmdModel.findOneAndDelete({_id:id})
            }, 86400000);
            return res.json({msg: "accepted as success"})
            
        }
   
},
    
    cmdDetails : async (req, res) => {

        const {IDC} = req.params
        let cmd = await CmdModel.findOne({_id:IDC})
        console.log("hhhhhhhhh",cmd)

        let ent = await UserModel.findOne({_id:cmd.EnterpriseId})
        console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",ent)
        let prod = await productModel.findOne({_id:cmd.IPC})
        console.log("pppppppppppp",prod)

    res.json({cmd,cmd,ent:ent,prod:prod})
    },
    SendCode: async (req, res) => {
        const generateRandomString = function(length= 8){
            return Math.random().toString(20).substr(2,6)
            }
            const code = generateRandomString() 
        const{number} = req.body
        console.log(number)
        client.messages.create({
            body: `bienvenue chez M2M votre code de confirmation ${code}`,
            to: `+216${number}`,
            from: '+16145324315'
         }).then(message => console.log(message),res.json({message:"success",code:code}))
         
           .catch(error => console.log(error))
    }
  


};
module.exports = CmdCtrl;