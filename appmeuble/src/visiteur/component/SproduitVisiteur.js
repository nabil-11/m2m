import React,{useState,useEffect} from 'react'
import {Modal,Button,Row,Col,Container,InputGroup,FormControl,Form} from "react-bootstrap"
import { useParams } from 'react-router-dom';
import axios from "axios"
import moment from "moment"
import { store } from 'react-notifications-component';
import {FacebookShareButton}from "react-share";


export default function SproduitVisiteur() {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        window.location.href="/produitsContainer"
    }
    const[product,setProduct]=useState("");
    const [mproduit,smproduit]=useState([""])
 const {idproduit} = useParams()
 console.log(idproduit)
   useEffect(async() => {
    try {
        let SingleProduct = await axios.post(`http://localhost:3002/api/product_View`,{id:idproduit});
        console.log(SingleProduct.data)
        setProduct(SingleProduct.data.product)
        return SingleProduct;
      } catch (error) {
        console.log(error);
      }
      
   }, [""])
   const[remise,setRemise]=useState(false)
   const[pRemise,setpRemise]=useState(product.pSold)
   const handleRemise =async() =>{
          let remise = await axios.post("http://localhost:3002/api/remise",{pRemise:pRemise,PID:idproduit})
  
        }
        const [modifier,smodifier]=useState(false)
 
const btnModifier=()=>{
  smproduit(product)
  smodifier(true)
}
const modifierProduit=async()=>{
  let modifierproduit = await axios.post(`http://localhost:3002/api/modifierproduit/${idproduit}`,{pName:mproduit.pName,pDescription:mproduit.pDescription,pPrice:mproduit.pPrice,pCategory:mproduit.pCategory})
  if (modifierproduit.data.success){
    store.addNotification({
      title: "success!",
      message:`modification terminer avec success`,
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
      window.location.href="/mesproduits"
      
    },2000);
    

  } else{
    store.addNotification({
      title: "error!",
      message:`on a probleme`,
      type: "error",
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
}

    return (
        <>
        <Modal size="lg" show={show} onHide={handleClose} animation={false }>
          <Modal.Header closeButton>
            <Modal.Title>produit Détails</Modal.Title>
          </Modal.Header>
          <Modal.Body >             
                                
                                    
                                    <img className="img-fluid d-block mx-auto" src={`http://localhost:3002/uploads/products/${product.pImage}`} alt="image" style={{borderRadius:"20px",boxShadow:"0px 0px 5px 1px"}} />
                                    <h2 className="text-uppercase m-3" style={{textAlign:"center"}}>{product.pName}</h2>
                                   <div className="sproduit-info p-5">
                                   <Row >
                                       <FacebookShareButton url ="https://sotufab.tn/"className="w-25 ms-auto" variant="light" >
                                       <i className="fas fa-share-square text-dark"></i>
                                      </FacebookShareButton></Row>
                                                                      
                                    <p className="m-5" style={{textAlign:"center"}} >{product.pDescription}</p>
                                    <ul className="list-inline" >
                                        <li>
                                            <strong>Category:</strong>
                                            <br/>
                                            {product.pCategory}
                                        </li>
                                           <li>
                                            <strong>remise:</strong>
                                            <br/>
                                           {
                                               product.pSold == 0 ?   "Ce produit est sans remise" :`avec remise de ${product.pSold} %`                                        } 
                                        </li>
                                        <li style={{textAlign: 'right' ,backgroundColor:`${product.pSold==0 ? "#FFA500	" :"#9FE2BF" }`}}>
                                            
                                          <strong>  
                                            {product.pSold == 0 ?
                                            product.pPrice :  product.pPrice- product.pPrice*product.pSold /100
                                          }
                                          </strong>  TND
                                        </li>
                                        <li style={{textAlign: 'center',fontWeight: 'bold'}}>
                                        {moment(product.createdAt).startOf('hour').fromNow()  }
                                        </li>
                                    </ul>
                               
                               
                                 
                    </div>
                 
                                
                   

          </Modal.Body>
        
        </Modal>
      
      </>
    )
}
