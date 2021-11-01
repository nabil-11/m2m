import React from 'react'
import {Carousel,Row,Container,Col} from "react-bootstrap"
import Footer from "../visiteur/Footer";
export default function EntrepriseHome() {
    return (
        <>
      
       <Carousel className="carousel w-100" style={{boxShadow:"0 0 15px #ddd"}}>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      src="https://images3.alphacoders.com/268/thumb-1920-268075.jpg"
      alt="sallon"
      style={{height:"600px",backgroundSize:"cover"}}
    />
    <Carousel.Caption>
      <h3>chambre</h3>
      <p>promotion 20 %</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
      className="d-block w-100"
      src="https://images4.alphacoders.com/262/thumb-1920-262096.jpg"
      alt="Second slide"
      style={{height:"600px",backgroundSize:"cover"}}
    />
    <Carousel.Caption>
      <h3>Sallon</h3>
      <p>promtion 50%</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images3.alphacoders.com/253/thumb-1920-253375.jpg"
      alt="Third slide"
      style={{height:"600px",backgroundSize:"cover"}}
    />
    <Carousel.Caption>
      <h3>sallon</h3>
      <p>2250 TND</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
     
       <Row className="CHomeEnt w-100">
           <Container style={{width:"100%",height:"1000px",textAlign:"center",padding:"20px"}}>
               <Row className="m-5" ><h5 style={{color:"white"}}><strong>m2m</strong> fournit à ses partenaires des services importants<br/> pour la croissance et le développement dans le domaine du commerce de meubles  <br/> bienvenue chez nous </h5></Row>
                <Row className="w-100 g-3" md={1} >
                  <Col className="m-auto ">
                <div className="col-lg-4 m-auto text-center" style={{boxShadow:"0 0 15px #ddd",height:"250px",borderRadius:"20px",paddingTop:"50px"}}>
                <i class="fas fa-user-shield fa-3x mb-3"></i>
              <p>Sécurité de votre compte<br/> et de vos informations personnelles</p>
            </div></Col>
            <Col>
            <div className="col-lg-4 m-auto text-center"style={{boxShadow:"0 0 15px #ddd",height:"250px",borderRadius:"20px",paddingTop:"50px"}}>
            <i class="fas fa-palette fa-3x mb-3"></i>
              <p>Site Web pratique <br />et facile à utiliser</p>
            </div></Col>
            <Col>
            <div className="col-lg-4 m-auto text-center"style={{boxShadow:"0 0 15px #ddd",height:"250px",borderRadius:"20px",paddingTop:"50px"}}>
            <i class="fas fa-tachometer-alt fa-3x mb-3"></i>
              <p>Rapidité de service <br />et de connexion avec administrateur</p>
            </div></Col>
                </Row>
           </Container>
       </Row>
       <Row className="w-100">
       </Row>
    </>
    )
}

