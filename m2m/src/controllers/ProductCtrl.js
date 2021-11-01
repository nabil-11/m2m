const productModel = require('../Models/ProductModel')
const CmdModel = require('../Models/CmdModel')
const { toTitleCase} = require("../config/function");

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

const productCtrl= {
  
    
    
    NewProduct :  async(req, res) =>{
      try {
          const { pName,pPrice, pDescription,pCategory} = req.body;
          const pImage = req.file.filename;
          UserId = req.user._id
          UserName= req.user.name
          pLocation = req.user.location
          console.log(UserName)
          console.log(pName,pPrice,pDescription,pCategory,pImage,UserId);

          if(!pImage) return res.status(400).json({msg: "No image upload"})

          const newProduct = new productModel({
            pName,pPrice, pDescription,pImage,pCategory,UserId,UserName,pLocation
          })

          await newProduct.save()
          res.json({success: "creation produit complete"})

      } catch (err) {
          return res.status(500).json({error: `${err.message}`})
      }
  },
  myshop:  async(req, res) =>{
    let  UserId  = req.user._id;
    
    try {
      const features = new APIfeatures(productModel.find({UserId:UserId}), req.query)
      .filtering().sorting().paginating()

      const products = await features.query
      let nbrProduct= await productModel.find({UserId:UserId})

      res.json({
          status: 'success',
          result: products.length,
          products: products,
          nbr : nbrProduct.length
      })
      
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
  },
 Allproduct :  async(req, res) =>{
  try {
      const features = new APIfeatures(productModel.find(), req.query)
      .filtering().sorting().paginating()

      const products = await features.query
     

      res.json({
          status: 'success',
          result: products.length,
          products: products
      })
      
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
},
getSingleProduct : async (req, res)=> {
    let { id } = req.body;
    if (!id) {
      return res.json({ error: "All filled must be required"+id });
    } else {
      try {
        let product = await productModel
          .findById(id)
         
        if (product) {
          
          return res.json({product,sucess:"sdsd"});
        }
      } catch (err) {
        console.log(err);
       
        
      }
    }
  },
DeleteProduct:  async (req, res)=> {
    let { PID } = req.body;
    if (!PID) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
         let cmdP = await CmdModel.findOne({IPC:PID})
         if (cmdP){
           res.json({ error: "Ce produit a une demande"})
         }
         else{
            let deleteProduct = await productModel.findByIdAndDelete(PID);
        if (deleteProduct) {
         
       
          return res.json({ success: "produit est supprimer " });
         }
       
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  locationSearch :  async(req, res) =>{
    try {
        const features = new APIfeatures(productModel.find(), req.query)
        .filtering().sorting().paginating()
  
        const products = await features.query
  
        res.json({
            status: 'success',
            result: products.length,
            products: products
        })
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },
  remise:  async(req, res) =>{
      let {pRemise,PID}= req.body;
      try{
         let remiseproduit = await productModel.findByIdAndUpdate(PID,{pSold:pRemise})
         if(remiseproduit){
            return res.json({success:"complete !"})
      }
    }
      catch(err)
      {
        console.log(err)
      }
     

  },
  like :  async(req, res) =>{
    const UserId = req.user._id
    const {PID}=req.body
    const like = await productModel.findOne({_id:PID},{liked:UserId})
    const vote = await productModel.findOne({_id:PID})
    console.log(like.liked.length)
    if(like){
      return res.json({show:"" ,vote:like.liked.length})
    }else{
      return res.json({hide:"",vote:vote.liked.length})
    }

  },
likeDislike : async (req, res) =>{
 const {PID,like}=req.body
 const UserId = req.user._id
 console.log(UserId)
if (like){
  await productModel.findByIdAndUpdate(PID,{$pull:{liked:UserId}})
  console.log("dislike")
  return res.json({hide:""})
}
else{
  await productModel.findByIdAndUpdate(PID,{$push:{liked:UserId}})
  console.log("like")
  return res.json({show:""})
}
  


},
updateProduct :  async(req, res) =>{
     const {pName, pPrice, pDescription,pCategory} = req.body;
  try {
    await productModel.findOneAndUpdate({_id: req.params.ProduitID}, {
        pPrice:pPrice,pDescription:pDescription,pCategory:pCategory,pName:pName
    })

    res.json({success: "Updated a Product"})
} catch (err) {
    return res.status(500).json({error: err.message})
}
}

 
    }  
module.exports = productCtrl;