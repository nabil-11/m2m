import React,{useState} from 'react'
import {Offcanvas,Form,Button,Row,Alert,Image} from "react-bootstrap"
import { store } from 'react-notifications-component';
import GoogleLogin from 'react-google-login';
import axios from "axios"
export default function Connecter() {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        window.location.href="/Home"
    }
    const [auth,setAuth]=useState({
      email :'',
      password:'',
      success:false,
      error:false,
          });

          const handlelogin = async(e) =>{
         
            setAuth({...auth})
          if (!auth.email){
            setAuth({
            ...auth,
            error: {email:"champ vide"}
         });
         }
         else if(!auth.password){
          setAuth({
            ...auth,
            error: {password:"champ vide"}
         });

         }
         else {
                  let ApiSignIn = await axios.post(`http://localhost:3002/user/signin`, {email:auth.email,password:auth.password});
 if (ApiSignIn.data.error){
          setAuth({...auth,
            error: ApiSignIn.data.error
            
          });
        }
        else if (ApiSignIn.data.token) {
          console.log("token",ApiSignIn.data)
         setAuth({...auth,
        success: ApiSignIn.data.success,
        email:"",
        password:"",
        })
        store.addNotification({
          title: "success!",
          message:`${ApiSignIn.data.success}`,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        });
        localStorage.setItem('token',ApiSignIn.data.token) 
        localStorage.setItem('email',auth.email)
        localStorage.setItem('role',ApiSignIn.data.role)
        localStorage.setItem('name',ApiSignIn.data.name)
        if(ApiSignIn.data.role=="entreprise"){
          localStorage.setItem('verify',ApiSignIn.data.verify)
        }
        
        setTimeout(() => {
          if (ApiSignIn.data.role=="entreprise"){
            window.location.href="/Home_Entreprise"
          }
          else if(ApiSignIn.data.role=="user"){
            window.location.href="/gallerie"
          }
          else if(ApiSignIn.data.role=="admin"){
            window.location.href="/gestionEntreprise"
          }
            
        }, 2000);
      
      
        
       }
         }
         
        }
        const [imageProfile,SIprofile]=useState("")
        const responseGoogle = (response) => {
          console.log(response);
          setAuth({...auth,email:response.profileObj.email})
          SIprofile(response.profileObj.imageUrl)
         

        }

        //*change password*/
        
 const changepassword = async()=>{
   if (!auth.email){
    setAuth({
      ...auth,
      error: {email:"champ vide"}
   });

   } 
   else {
   const res =await axios.post("http://localhost:3002/user/forgotPassword",{gmail:auth.email})

     window.location.href="/Home"
   }
 }
 const [FPassword,setFPassword]=useState(false)


    return (
        <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Se Connecter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row className="w-50 m-auto">
                    <Image  src={imageProfile} roundedCircle />

          </Row>
        <Form >
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Adresse Email</Form.Label>
    <Form.Control type="email" placeholder="Enter email"
     onChange={(e)=>{
      setAuth({...auth,
          email:e.target.value})
  }}
  value={auth.email}
    />
    <Form.Text className="text-muted">
    Votre email est important pour vous connecter ne le partager avec d'autres
    </Form.Text>
    <Row>
    {
      !auth.error.email ? "" : <Alert variant="danger">{auth.error.email}</Alert>
    }
    </Row>
  </Form.Group>
{
  FPassword ? 
  <>
  <p>Vous allez écrire votre email pour envoyer un nouveau email de mot de passe si vous êtes déjà membre</p>
   <Button variant="primary" onClick={changepassword}  style={{float: "right"}}>
  recevoir email
</Button>
  </>
  
 
  : <>
   <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Mot de Passe</Form.Label>
    <Form.Control type="password" placeholder="Password" 
      onChange={(e)=>{
        setAuth({...auth,
            password:e.target.value})
    }}
    value={auth.password}
    />
  </Form.Group>
  <Row>
  {
      !auth.error.password ? "" : <Alert variant="danger">{auth.error.password}</Alert>
    }
  </Row>
  <Form.Group className="mb-3" >
   <a className="pl-2" onClick={()=>setFPassword(true)}>régener mot de passe</a> 
  </Form.Group>
  <GoogleLogin
        clientId="906633061016-9m71shlf9phkv5hrd9ladmq15betgrlj.apps.googleusercontent.com"
        buttonText="connecter avec google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
  <Button variant="primary" onClick={handlelogin}  style={{float: "right"}}>
    connecter
  </Button>
  </>
}
 
</Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
    )
}
