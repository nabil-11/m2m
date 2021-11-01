import React,{useEffect,useState} from 'react'
import {Card,Row,Col,Button} from "react-bootstrap"
import {FacebookShareButton}from "react-share";

import axios from "axios"
import moment from 'moment';

export default function CardClient(props) {
  const[likedbtn,setLikedBtn]=useState("")

  

  const[vote,setvote]=useState("")
  console.log(vote)
  const token =localStorage.getItem("token")
    useEffect(async() => {
   let res = await axios.post("http://localhost:3002/api/likebtn",{PID:props.product._id}, {
    headers: {Authorization: `Bearer ${token}`} 
   
})
if(res.data.show){
  setLikedBtn(true)
}else{
  setLikedBtn(false)
}
 setvote(res.data.vote)

    }, [likedbtn])
    const likeDislike =async()=>{
      let likedislike = await axios.post("http://localhost:3002/api/likeDislike",{PID:props.product._id,like:!likedbtn},{
        headers: {Authorization: `Bearer ${token}`} 
    })
 
    }
console.log(likedbtn)
    return (
        <Card className="cardProduct bg-dark text-white w-100 m-auto" style={{borderRadius:"20px"}}>
        <Card.Img src={`http://localhost:3002/uploads/products/${props.product.pImage}`} alt="Card image" style={{height:"100%",width:"auto",backgroundSize:"cover",borderRadius:"inherit" ,backgroundAttachment:"fixed"}}/>
        <Card.ImgOverlay className="imgOverlay" style={{color:"white"}}>
        {
            props.product.pSold==0 ? "":
            <Row>
            <Col className="ms-auto"md={3}><h4 className="cadreSold p-1" style={{position:"absolute"}}>{props.product.pSold} %</h4> </Col>
          </Row>
          }
          <Row><h4 style={{color:"white"}}>{props.product.pName}</h4></Row>
         
          <Row><Col><h6 style={{textAlign: 'left',color:"white"}}><strong>categorie:  </strong>   {props.product.pCategory}</h6></Col> </Row>
          <Row><Col><h6 style={{textAlign: 'left',color:"white"}}><strong>Entreprise:  </strong>   {props.product.UserName}</h6></Col> </Row>
          <Row><Col><h5 className="w-50 ms-auto" style={{backgroundColor:"goldenrod",textAlign:"center",borderRadius:"10px",color:"white"}}>Prix {props.product.pPrice-props.product.pPrice * props.product.pSold/100}</h5></Col> </Row>
          <Row md={3} className="mt-5 mb-2 p-2" style={{backgroundColor:"white",borderRadius:"10px",textAlign:"center"}}>
          <Col><Button  variant={`${likedbtn ? "danger" :"light"}`} onClick={likeDislike}><i className="fas fa-heart">{vote}</i></Button></Col>
            <Col><FacebookShareButton url ="https://sotufab.tn/"> <Button variant="outline"><i className="fas fa-share-alt-square fa" ></i></Button></FacebookShareButton></Col>
            <Col><Button href={`produit_details/${props.product._id}`} ><i className="fas fa-info-circle"></i></Button></Col>
          </Row>
          <h4 style={{textAlign: 'right',color:"white"}}>{moment(props.product.createdAt).startOf('hour').fromNow()  }</h4>
        </Card.ImgOverlay>
      </Card>
    )
    
}
