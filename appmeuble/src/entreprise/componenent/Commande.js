import React from 'react'
import {Row,Container,Button} from "react-bootstrap"
import moment from "moment"
export default function Commande(props) {
    return (
        <Container className="commande m-auto p-5 mb-3" style={{borderRadius:"20px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 2px 5px"}}>
            <Row className="text-center">
             {
            props.commande.etat=="accepter" ?  <i className="fas fa-check-circle fa-4x position-absolute text-success "></i>
 : props.commande.etat=="refuser" ?
 
 <i className="fas fa-times-circle fa-4x position-absolute text-danger" ></i>
           : <i className="fas fa-clock fa-4x position-absolute text-primary"></i>    }
           </Row>
            <Row><h4>{props.commande.FirstName +" "+props.commande.LastName}</h4></Row>
            <Row><h6><strong>CIN: </strong> {props.commande.cin}</h6> </Row>
            <Row><h6><strong>telephone: </strong> {props.commande.number}</h6> </Row>
            
            <Row  style={{textAlign: 'right'}}><p >{moment(props.commande.createdAt).startOf('hour').fromNow()  }</p></Row>
            <Row  style={{textAlign: 'right'}}><Button size="sm" className="w-25 ms-auto " href ={`/mescommandes/Gcommande/${props.commande._id}`} >plus</Button></Row>

        </Container>
    )
}
