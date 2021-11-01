const userModel = require('../Models/UserModel')
const productModel = require('../Models/ProductModel')
const cmdModel = require('../Models/CmdModel')
const { toTitleCase, validateEmail } = require("../config/function");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
const userCtrl = {
  
    register: async (req, res)=> {
        let { name, email, password, cPassword,location,role,phone} = req.body;
        let verifyImage =""
        if(role=="entreprise"){
           verifyImage = req.file.filename;
        }
        
       
        console.log('register',name,email,password,cPassword,location,role);
        let error = {};
        if (role=="entreprise"){
   if(!verifyImage) {
          error = {
            ...error,
            verifyImage: "no Image upload",
          };
          
        }


        }
        
     
        if (name.length < 3 || name.length > 25) {
          error = { ...error, name: "Name must be 3-25 charecter" };
          return res.json({ error });
        } else {
          if (validateEmail(email)) {
            name = toTitleCase(name);
            if ((password.length > 255) | (password.length < 8)) {
              error = {
                ...error,
                password: "Password must be 8 charecter",
                name: "",
                email: "",
              };
              return res.json({ error });
            } else {
          
              try {
                password = bcrypt.hashSync(password, 10);
                const data = await userModel.findOne({ email: email });
                if (data) {
                  error = {
                    ...error,
                    password: "",
                    name: "",
                    email: "Email already exists",
                  };
                  return res.json({ error });
                } else {
                  if(role=="user"){
                     let newUser = new userModel({
                    name,
                    email,
                    password,
                    role
                    
                  });
                  newUser
                    .save()
                    .then((data) => {
                      return res.json({
                        success: "Account create successfully. Please login",
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  } else {
                    
                    let newUser = new userModel({
                      name,
                      email,
                      password,
                      verifyImage,
                    location,
                    role,
                    phone,
                    });
                    newUser
                      .save()
                      .then((data) => {
                        return res.json({
                          success: "Account create successfully. Please login",
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                 
                }
              } catch (err) {
                console.log(err);
              }
            }
          } else {
            error = {
              ...error,
              password: "",
              name: "",
              email: "Email is not valid",
            };
            return res.json({ error });
          }
        }
      },
      signin: async (req, res) =>{
         let success = false;
         let error={}
         const {email, password} = req.body; 
          console.log('login',email,password)
        try {
            const user = await userModel.findOne({email})
            if(!user){
              error ={
                ...error,
                email:"Utilisateur non trouvé."
                
              }

            
             return res.json({error});
             }
             

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
              error= {
            ...error,
          password :"mot de passe incorrect" ,  email : ""       }
              return res.json({error}) 
            
            }
             
            const secret = process.env.JWT_SECRET;
            const expire = process.env.JWT_EXPIRATION;

            const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expire });
            error={
              ...error,
              password:"",email:""
            }
         
            success =" login success"
            let userr = await userModel.findOne({email:email})
            let role = userr.role
            let name = userr.name
            if(role=="entreprise"){
              let verify = user.verify
           res.send({ token ,success,role,name,verify });
            }
            else {
              res.send({ token ,success,role,name});
            }
             

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
  FPassword : async(req,res) => {
    const {gmail} =req.body
    const generateRandomString = function(length= 8){
      return Math.random().toString(20).substr(2, 8)
      }
      const NewPassword = generateRandomString()
      console.log(NewPassword)
  
console.log(gmail)


    
 try{
   let user = await userModel.findOne({ email:gmail})
   console.log(user.password)
      if (!user){
   return  res.json({msg:" User not find  create new compte"})
   }
   else {
    password = bcrypt.hashSync(NewPassword, 10);

let NewUser = await userModel.findOneAndUpdate({email:gmail},{password:password})
     const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'bdh.nabil@gmail.com',
        pass: 'BOL@bdh99611804'
    }
});
console.log(NewUser.password)

// send email
await transporter.sendMail({
    from: 'M2M@gmail.com',
    to: `${gmail}`,
    subject: 'forgot password M2M',
    html: `<h1>Example HTML Message Body</h1> <p> your new password <strong>${NewPassword}</strong> </p>`
});
return res.json({success:'your password change with success go to email get new password'})
   }
  
 }catch(err){
   console.log(err)
 }
},
ChangePassword : async (req, res) => {
  const {password} =req.body;
  NewPassword = bcrypt.hashSync(password, 10);

  let NewUser = await userModel.findOneAndUpdate({_id:req.user._id},{password:NewPassword})
res.json({success:'your password change with success'})
},
VerifyUser: async (req, res) => {
  const  {idUserproduct}=req.body
  const iduser = req.user._id
  console.log(iduser,idUserproduct)
  if(idUserproduct != iduser) {
    return res.json({error:"error"})
  }
  else{
   return res.json({myshop:"true"})
  }

},
 deleteCompte : async (req, res) =>{

  const userId=req.user._id
     try {
         
            let cmd = await cmdModel.findOne({EnterpriseId:userId})
            if (!cmd) {
           let deletecompte =  await userModel.findOneAndDelete({_id:userId})
          return    res.json({sucess:""})
            
            } else{
            return  res.json({failed:""})
            }
     }
     catch(err){
       console.log(err)
     }
},
statistique: async (req, res) => {
  let nbrEnt = await userModel.find({role:"entreprise"},{verify:true})
  let nbrcmd = await cmdModel.find({})
  let nbrp  = await productModel.find({})
  console.log(nbrEnt.length, nbrcmd.length, nbrp.length)
 return  res.json({ nbrEnt: nbrEnt.length, nbrp: nbrp.length,nbrcmd:nbrcmd.length,nbrp:nbrp.length})
}    
    
}
module.exports = userCtrl