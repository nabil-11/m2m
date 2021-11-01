import React,{useState,useEffect} from 'react'
import {Modal,Button,Row,Col,Container,InputGroup,FormControl,Form} from "react-bootstrap"
import { useParams } from 'react-router-dom';
import axios from "axios"
import moment from "moment"
import TextField from '@material-ui/core/TextField';
import { store } from 'react-notifications-component';


export default function Sproduit() {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        window.location.href="/mesproduits"
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
const deleteProduct =async()=>{
  let DProd = await axios.post("http://localhost:3002/api/DeleteProduct",{PID:idproduit})
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
      window.location.href="/mesproduits"
      
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
  console.log(product)
  console.log('mproduit',mproduit)
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
                                     <Row ><Button className="w-25 ms-auto" variant="light"><i className="fas fa-share-square"></i></Button></Row>
                                   
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
                                    <Row md={3} className="p-3" style={{textAlign:"center",borderTop:"1px solid"}}>
                                      <Col><Button variant="success" onClick={()=>setRemise(!remise)}>remises</Button></Col>
                                      <Col><Button onClick={btnModifier} >modifier</Button></Col>
                                      <Col><Button variant="danger"onClick={deleteProduct}>supprimer</Button></Col>
                                    </Row>
                                    {
                                      remise 
                                      ?   <Row>
                                     <Container>
                                        <h1> Remise Zone</h1>
                                        <Row className="w-50 m-auto">
                                        <TextField
                                                      id="filled-number"
                                                      label="donnez votre pourcentage de Remise %"
                                                      type="number"
                                                      InputLabelProps={{
                                                        shrink: true,
                                                      }}
                                                      variant="filled"
                                                      onChange={(e)=>{setpRemise(e.target.value)}}
                                                      value={pRemise}
                                                   
                                                    />    
                                        </Row>
                                        <Row style={{textAlign:"right"}} className="m-3"><p>nouveau prix :{product.pPrice}TND de pourecentage {pRemise} %  = <strong style={{backgroundColor:"#FFD700	",padding:"5px"}}> {product.pPrice - product.pPrice*pRemise /100} TND </strong></p> </Row>
                                        <Row className="w-25 ms-auto m-3">
                                          <Button onClick={handleRemise} className="">{product.pSold ==0 ? "confirmer" :"changer remise" }</Button>
                                        </Row>
                                     </Container>
                                    </Row> :""
                                    }
                                 
                    </div>
                    { modifier ?
                     <Row className="w-100">
      <Container className="sproduit-info m-3 p-5">
        <Row className="mb-3" >
   <Col>
        <InputGroup >
  <InputGroup.Text>Titre</InputGroup.Text>
  <FormControl aria-label="titre" value={mproduit.pName} onChange={(e)=>smproduit({...mproduit,pName:e.target.value })}/>
</InputGroup>
        </Col>

        </Row>
        <Row className="mb-3">
   <Col>
        <InputGroup>
  <InputGroup.Text>Description</InputGroup.Text>
  <FormControl as="textarea" aria-label="titre" value={mproduit.pDescription} onChange={(e)=>smproduit({...mproduit,pDescription:e.target.value })}/>
</InputGroup>
        </Col>

        </Row>
        <Row className="mb-3" md={2} >
          <Col>
         <h5>categorie :</h5></Col>
          <Col>
          <Form.Select size="sm"
            label="Categories"
            helperText="changer  type  produit"
            onChange={(e) =>smproduit({...mproduit,pCategory:e.target.value })}
        >
  
 
        
        <option value="sallon">sallon</option>
        <option value="chambre">chambre</option>
        <option value="bureau">bureau</option>
        <option value="jardin">jardin</option>
        <option value="enfants">enfants</option>
        <option value="décoration">décoration</option>
 </Form.Select>
          </Col>
        
         
       
</Row>
<Row className="mb-3">
   <Col>
        
        <InputGroup >
    <InputGroup.Text>$</InputGroup.Text>
    <FormControl aria-label="Amount (to the nearest dinar)" type="number"
    value={mproduit.pPrice} onChange={(e)=>smproduit({...mproduit,pPrice:e.target.value })}
    />
    <InputGroup.Text>.TND</InputGroup.Text>
  </InputGroup>
        </Col>

        </Row>
        <Row>
          <Button className="w-25 ms-auto" onClick={modifierProduit}>
            modifier produit
          </Button>
        </Row>
        
        
     
      </Container>

    </Row>   

           :""         }
                                
                   

          </Modal.Body>
        
        </Modal>
      
      </>
    )
}
