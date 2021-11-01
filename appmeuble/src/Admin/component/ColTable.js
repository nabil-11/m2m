import React ,{useState,useEffect} from 'react'
import {Button,Modal,Container} from "react-bootstrap"
import moment from "moment"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from "axios";


export default function ColTable(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [verification,setVerification]=useState(props.ent.verify)
    console.log("verfication",verification)
    const handleChange = async() => {
        if(window.confirm(`${verification ? "desactiver compter" : "activer compter"}`)){
setVerification(!verification)
let res = await  axios.post("http://localhost:3002/api/verification",{verification:!verification,id:props.ent._id})
        }
        
    }
   const deleteEnterprise = async()=>{
if(window.confirm("Are you sure you want to delete")){
  const dEnterprise = await axios.post("http://localhost:3002/api/deleteEnterprise",{UserId:props.ent._id})

if(dEnterprise.data.success){
  alert("success")
  window.location.href="/gestionEntreprise"
}
else{
  alert('error')
}
   }

}

    return (
        <>
        <tr className="text-black">
        <td>{moment(props.ent.createdAt).startOf('hour').fromNow()  }</td>
        <td>{props.ent.name}</td>
        <td>{props.ent.location}</td>
        <td> 

     
  <Button variant="primary" onClick={handleShow}>
   voir image
  </Button>

 

        </td>
      
        <td>  <FormGroup>
  <FormControlLabel
    control={<Switch checked={verification} onChange={handleChange} name="checkedA" />}
    label="Activer"
  />
  </FormGroup> </td>
  <td><Button variant ="danger"onClick={deleteEnterprise}>supprimer compte</Button></td>
      </tr>
      <Modal show={show} onHide={handleClose} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>code fiscale par image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
        <img src={`http://localhost:3002/uploads/verify/${props.ent.verifyImage}`} className="img-fluid" />
      </Container>  </Modal.Body>
       
      </Modal>
      </>
      
    )
}
