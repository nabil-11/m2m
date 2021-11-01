import React from 'react'
import {Card,Col,Row,Button} from "react-bootstrap"
import moment from 'moment';
export default function visiteurCard(props) {
    return (
        <Card className="cardProduct bg-dark text-white w-100 m-auto" style={{borderRadius:"20px"}}>
        <Card.Img src={`http://localhost:3002/uploads/products/${props.product.pImage}`} alt="Card image" style={{height:"100%",width:"auto",backgroundSize:"cover",borderRadius:"inherit" ,backgroundAttachment:"fixed"}}/>
        <Card.ImgOverlay>
         
        <Row ><h5>{props.product.pName}</h5></Row>
            <Row  style={{textAlign:"left"}}><p>{props.product.pCategory}</p></Row>
            <Row style={{textAlign:"center",marginTop:"20%"}}><Col md={8} className="m-auto"><p className="prixZone">{props.product.pPrice} TND</p></Col></Row>

         
          <Row style={{marginTop:"5%"}}>
              <Col md={6}><Button size="sm" href={`/produit_details/${props.product._id}`}>Plus d'info</Button></Col>
              <Col md={6}> <Card.Text>{moment(props.product.createdAt).startOf('hour').fromNow()  }</Card.Text></Col>
             </Row>
        </Card.ImgOverlay>
      </Card>
    )
}
