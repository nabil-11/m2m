import React,{useEffect,useState} from 'react'
import {Container,Row,Col,Carousel,Image} from "react-bootstrap"
import "./client.css"
import axios from "axios"

export default function HomeClient() {
  const[nbrp,snbrp]=useState('')
  const[nbrEnt,snbrEnt]=useState('')
  const[nbrcmd,snbrcmd]=useState('')
  useEffect(async() => {
   let  sta = await axios.post("http://localhost:3002/user/sta")  
  snbrp(sta.data.nbrp)
  snbrEnt(sta.data.nbrEnt)
  snbrcmd(sta.data.nbrcmd)
  
    console.log("nombrep",sta.data)

  
  }, [""])
  const name = localStorage.getItem('name')
    
    return (
       <>
      
           <Row className="w-100 m-auto">
               <Container className="secOne m-auto p-5" >
                   <h3 className="text-dark " style={{marginTop:"10%",fontWeight:"bold"}}>Bienvenue chez votre espace</h3>
                   <h3  className="text-white" style={{textAlign: 'right'}} >{name}</h3>
               </Container>
           </Row>
           <Row className="w-100 m-auto">
               <Col md={6}>
               <Carousel className="mt-5" style={{boxShadow:" white 0px 0px 5px 2px",height:"300px",width:"100%"}}>
  <Carousel.Item>
    <Image
      className="d-block w-100"
      src="https://www.marchedumeuble.ch/wp-content/uploads/2018/04/salons26.jpg"
      alt="First slide"
      style={{height:"300px",backgroundSize:"cover",borderRadius:"inherit"}}
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <Image
      className="d-block w-100"
      src="https://www.marchedumeuble.ch/wp-content/uploads/2018/04/chambre20.jpg"
      alt="Second slide"
      style={{height:"300px",backgroundSize:"cover",borderRadius:"inherit"}}
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <Image
      className="d-block w-100"
      src="https://www.marchedumeuble.ch/wp-content/uploads/2018/04/chambre27.jpg"
      alt="Third slide"
      style={{height:"300px",backgroundSize:"cover",borderRadius:"inherit"}}
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
               </Col>
               <Col md={6}>
                   <Container className="mt-5" style={{boxShadow:"white 0px 0px 5px 1px",height:"300px",width:"100%",borderRadius:"20px"}}>
                    <h4 className="p-5 text-white"><strong>Cher client</strong>, nous sommes à votre service<br/> pour faciliter la relation entre l'entreprise et vous<br/> et pour cela nous vous proposons plusieurs services<br/> pour vous faciliter la vie.</h4>
                   </Container>
               </Col>
           </Row>
           <Row className="w-75  m-auto mb-5 mt-3">
               <Container md={2} className="g-3 w-100" style={{height:"300px",boxShadow:"white 0px 0px 5px 1px",borderRadius:"20px"}} >
                   <Row md={3} className="g-3  p-3 w-100 text-white">
                     <Col className="text-center "><h3 className="text-white">nombre des pertenaires</h3>
                     <i className="fas fa-store-alt fa-8x text-center mb-3"  ></i>
                     <h1 className="text-white">{nbrEnt}</h1>
                     </Col>
                     <Col className="text-center"><h3 className="text-white">Nombre des produits</h3>
                     <i class="fab fa-product-hunt fa-8x mb-3"></i>
                     <h1 className="text-white">{nbrp}</h1>
                     </Col>
                     <Col className="text-center"><h3 className="text-white">nombre des commandes</h3>
                     <i class="fas fa-list-alt fa-8x mb-3"></i>
                     <h1 className="text-white">{nbrcmd}</h1>
                     </Col>

                   </Row>

               </Container>
           </Row>
      
       </>
    )
}
