import React ,{useState}from 'react'
import { Offcanvas,Row,Button,Container } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import axios from "axios"


export default function ChangerMDP() {
    const [show, setShow] = useState(true);
 const role = localStorage.getItem('role')
    const handleClose = () =>{
        setShow(false);
        if (role =="entreprise"){
           window.location.href="Home_Entreprise"
        }
        else{
          window.location.href="gallerie"
        }
       
    } 
//*change mot de passe */
const token = localStorage.getItem('token')
    const [password,setpassword]=useState('')
   
      
const handlechangepassword =async()=>{
    if (password.length > 7){
      let res = await axios.post(`http://localhost:3002/user/changePassword`,{password} ,{
        headers: {Authorization: `Bearer ${token}`} 
    })
    } else{
      alert(" you must 8 charcter or more")
    }
    
    }
  
    return (
      <>
        <Offcanvas  show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>changer mot de passe</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
              <Container className="p-3">
              <Row >
                   <TextField id="standard-basic" label="Nouveau mot de Passe" type="password"
                    onChange={(e)=>setpassword(e.target.value)}
                    value={password}
                   />
              </Row>
              <Row>
                  <Button size="sm" className="w-50 ms-auto mt-5" onClick={handlechangepassword} >changer MDP</Button>
              </Row>
         </Container>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
    }