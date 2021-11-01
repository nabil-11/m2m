import React from 'react'
import {Row,Container,Button} from "react-bootstrap"
import moment from "moment"

export default function Commande(props) {
    return (
        <Container className="commande m-auto p-5 mb-3" style={{borderRadius:"20px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 2px 5px"}}>
        {
            props.command.etat=="accepter" ?        <i className="fas fa-check-circle fa-4x position-absolute text-success "></i>
 : props.command.etat=="refuser" ?
 
 <i className="fas fa-times-circle fa-4x position-absolute text-danger"></i>
           : <i className="fas fa-clock fa-4x position-absolute text-primary"></i>    }
            <Row className="text-center"><h4>{props.command.FirstName+" "+props.command.LastName}</h4></Row>
            
            <Row  style={{textAlign: 'right'}}><p className="text-dark">{moment(props.command.createdAt).startOf('hour').fromNow()  }</p></Row>
            <Row  style={{textAlign: 'right'}}><Button size="sm" className="w-25 ms-auto " href={`/commandesclient/cmd/${props.command._id}`}>plus</Button></Row>

        </Container>
    )
}
