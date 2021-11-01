import React ,{useEffect,useState} from 'react'
import {Modal,Button,Row,Col,Container,Alert} from "react-bootstrap"
import TextField from '@material-ui/core/TextField';
import {store} from "react-notifications-component";
import {FacebookShareButton}from "react-share";
import { useParams } from 'react-router-dom';
import axios from "axios"
import moment from "moment"
export default function SProduitAdmin() {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        window.location.href="/gestionProduits"
    }
    const[product,setProduct]=useState("");
    const[code,setCode]=useState("");
    const [codeConfirmation,setCC ]=useState("");

 const {idprodAd} = useParams()
 console.log(idprodAd)
 const deleteProduct =async()=>{
  let DProd = await axios.post("http://localhost:3002/api/DeleteProduct",{PID:idprodAd})
  if (DProd.data.success){
    store.addNotification({
      title: "success!",
      message:`suppression terminer avec success`,
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
      window.location.href="/gestionProduits"
      
    },2000);
  }
  else{
    store.addNotification({
      title: "error!",
      message:`Nous avons une commande en cours avec ce produit`,
      type: "danger",
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
   useEffect(async() => {
    try {
        let SingleProduct = await axios.post(`http://localhost:3002/api/product_View`,{id:idprodAd});
        console.log(SingleProduct.data)
        setProduct(SingleProduct.data.product)
        return SingleProduct;
      } catch (error) {
        console.log(error);
      }
      
   }, [""])
   const [count,setCount]= useState(0)
   /* commande parms */
   console.log("ddd",product.UserId)
   
   
 
  
  const token = localStorage.getItem('token')
  
  
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
                                   
                                    <p className="m-5 text-dark" style={{textAlign:"center"}} >{product.pDescription}</p>
                                    <ul className="list-inline" >
                                        <li className="text-dark">
                                            <strong className="text-dark">Category:</strong>
                                            <br/>
                                            {product.pCategory}
                                        </li >
                                           <li className="text-dark">
                                            <strong className="text-dark">remise:</strong>
                                            <br/>
                                           {
                                               product.pSold == 0 ?   "Ce produit est sans remise" :`avec remise de ${product.pSold} %`                                        } 
                                        </li>
                                        <li style={{textAlign: 'right' ,backgroundColor:`${product.pSold==0 ? "#FFA500	" :"#9FE2BF" }`}}>
                                            
                                          <strong> {product.pPrice -product.pPrice*product.pSold/100}</strong>  TND
                                        </li>
                                        <li style={{textAlign: 'center',fontWeight: 'bold'}}>
                                        {moment(product.createdAt).startOf('hour').fromNow()  }
                                        </li>
                                    </ul>
                                 
                                   <Row>
                                     <Button variant="danger" onClick={deleteProduct}> supprimer produit</Button>
                                   </Row>
                                    
                                    
                    </div>
                                
                        

          </Modal.Body>
        
        </Modal>
     
      </>
    )
}
