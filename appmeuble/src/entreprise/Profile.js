import React ,{useState}from 'react'
import {Offcanvas,Col,Row,Button} from "react-bootstrap"
import { store } from 'react-notifications-component';
import axios from "axios"

export default function Profile() {
    const [show, setShow] = useState(true);

    const handleClose = () =>{
setShow(false);
window.location.href="/Home_Entreprise"
    } 
    const token = localStorage.getItem("token")
    console.log(token)
    const deleteCompte =async()=>{
      let deletecompte = await axios.delete("http://localhost:3002/user/deletecompte",{
        headers: {Authorization: `Bearer ${token}`} })

      if (deletecompte.data.success){
        store.addNotification({
          title: "success",
          message:`complete`,
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

      }
      else{
        store.addNotification({
          title: "success",
          message:`complete`,
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
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('email');
          localStorage.removeItem('name');
          localStorage.removeItem('verify');
        window.location.href="/home" }, 2000    )
      }
      

    }
  
    return (
      <>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Profile</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="text-center">
            <Row>
                        <i className="fas fa-user-circle fa-10x"></i>

            </Row>
            <Button variant="danger" onClick={deleteCompte}>supprimer mon compte</Button>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
}
