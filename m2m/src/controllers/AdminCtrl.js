const userModel = require('../Models/UserModel')

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

const AdminCtrl ={
    deleteEnterprise :async (req, res) => {
        const {UserId} = req.body
        try {
            let denterprise = await userModel.findByIdAndDelete(UserId)
            console.log("csczcescz")
            return res.json({success:"hhhhhhhhhh"}) 
        }
        catch(err) {
            console.log(err)
        }
        
        if (denterprise) {
            console.log("hhhhhhhhhssssssssssssss")
            return res.json({success:"hhhhhhhhhh"}) 
        }
        else {
            console.log("hhhhhhhhhhsssssssssseeeeeeeedefe")
            return res.json({error: "hhhhhhhh"}) 
        }

    },
    listeClients :async (req, res) => {
        const features = new APIfeatures(userModel.find({role:"user"}), req.query)
        .filtering().sorting().paginating()
        const clients = await features.query

        res.json({clients:clients})
       
    },
    listEnterprise: async (req, res) => {
        const features = new APIfeatures(userModel.find({role:"entreprise"}), req.query)
        .filtering().sorting().paginating()
        const entreprise = await features.query

        res.json({entreprise:entreprise})
       
    },
    verification :async (req, res) => {
        const {verification,id}= req.body
        console.log(verification,id)
        const ver = await userModel.findOneAndUpdate({_id:id},{verify:verification})
        if(ver){
            return res.json({success:"ssuccess"})
        }
        else{
            return res.json({error:"error"})
        }
        
    }
}
module.exports =AdminCtrl