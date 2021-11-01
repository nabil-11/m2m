import React,{useState,useEffect} from 'react'
import {Modal,Row,Container,Button,Col} from "react-bootstrap";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from "moment"
import {store} from "react-notifications-component";
export default function ScommandeEnt() {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 const{idcommand} =useParams();
  let IDC = idcommand
 const[product,setproduct]=useState([''])
 const [cmd, setcmd] = useState([''])
 const[ent,setEnt]=useState([''])
 useEffect(async() => {
     let  cmd = await axios.post(`http://localhost:3002/api/cmdDetails/${IDC}`)
     setproduct(cmd.data.prod)
     setcmd(cmd.data.cmd)
     setEnt(cmd.data.ent)
 },[""])
 const annulerCmd =()=>{
     let Acmd = axios.post('http://localhost:3002/api/DeleteCmd',{CID:cmd._id})
     store.addNotification({
        title: "success",
        message: `anuulation est complete`,
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
          window.location.href="/commandesclient"
          
      }, 2000);
 }
 console.log(cmd,product,ent)
 const token = localStorage.getItem('token');
  const accepterCmd =async()=>{
    let res = await axios.post("http://localhost:3002/api/acceptedcommand",{id:cmd._id},{
      headers: {Authorization: `Bearer ${token}`} 
      
  })

    store.addNotification({
      title: "success",
      message: `commande est accepter`,
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
      window.location.href="/mescommandes"
      
  }, 2000);
      
  }
  const refuserCmd =async()=>{
    let res = await axios.post("http://localhost:3002/api/refusedcommand",{id:cmd._id},{
      headers: {Authorization: `Bearer ${token}`} 
      
  })

    store.addNotification({
      title: "success",
      message: `commande est refuser`,
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
      window.location.href="/mescommandes"
      
  }, 2000);
      
  }

    return (
        <>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>information de commande</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Container className="p-5">
            <Row><h3 style={{borderBottom:"1px solid"}}>information commande</h3></Row>
          <Row><strong>nom  et Prénom  :</strong><p>{cmd.FirstName + "  " + cmd.LastName}</p></Row>
          <Row><strong>CIN :</strong><p>{cmd.cin}</p></Row>
          <Row><strong>telephone:</strong><p>{cmd.number}</p></Row>
          <Row><strong>etat de commande:</strong><p>{cmd.etat}</p></Row>
          <Row><strong> date creation : </strong> <p> {moment(cmd.createdAt).startOf('hour').fromNow()  }</p></Row>
     {
       cmd.etat !=="attente" ?
       "" :
       <> <Row className="m-2">
                   <Button variant="success" onClick ={accepterCmd}>accepter demande d'achat</Button>

      </Row>
        <Row className="m-2"> 
         
           
          
                    <Button variant="danger" onClick={refuserCmd}>refuser demande d'achat</Button>

        
          
          </Row>
       </>
     }
     
        </Container>
    </Row>
    <Row><img src={`http://localhost:3002/uploads/products/${product.pImage}`} /></Row>
    <Row>
        <Container className="p-5">
            <Row><h3 style={{borderBottom:"1px solid"}}>information produit</h3></Row>
          <Row><strong>titre de produit :</strong><p>{product.pName}</p></Row>
          <Row><strong>categorie :</strong><p>{product.pCategory}</p></Row>
          <Row><strong>promotion :</strong><p>{cmd.pSold}</p></Row>
          <Row><strong> prix : </strong> <p>{cmd.pPrice}</p></Row>
        </Container>
    </Row>
    <Row>
    <Container className="p-5">
            <Row><h3 style={{borderBottom:"1px solid"}}>information entreprise</h3></Row>
          <Row><strong> entreprise :</strong><p>{ent.name}</p></Row>
          <Row><strong>localisation :</strong><p>{ent.location}</p></Row>
          <Row><strong>telephone :</strong><p>{ent.phone}</p></Row>
        
        </Container>

    </Row>
        </Modal.Body>
   
      </Modal>
    </>
    )
}
