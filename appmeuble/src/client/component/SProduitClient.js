import React ,{useEffect,useState} from 'react'
import {Modal,Button,Row,Col,Container,Alert} from "react-bootstrap"
import TextField from '@material-ui/core/TextField';
import {store} from "react-notifications-component";
import {FacebookShareButton}from "react-share";
import { useParams } from 'react-router-dom';
import axios from "axios"
import moment from "moment"
export default function SProduitClient() {
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        window.location.href="/gallerie"
    }
    const[product,setProduct]=useState("");
    const[code,setCode]=useState("");
    const [codeConfirmation,setCC ]=useState("");

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
   const [count,setCount]= useState(0)
   /* commande parms */
   console.log("ddd",product.UserId)
   const [command,setCommand]=useState({

    FirstName:"",
    LastName:"",
    cin:"",
    city:"",
    state:"",
    zip:"",
    number:"",
    IPC:idproduit,
    error:"",
    success:""
  })
 
  console.log(command)
  const token = localStorage.getItem('token')
  const addCmd =async() =>{
      
    try {
        let addcmd =  await axios.post(`http://localhost:3002/api/AddCmd`,{FirstName:command.FirstName,LastName:command.LastName,EnterpriseId:product.UserId,cin:command.cin,IPC:command.IPC,state:command.state,city:command.city,zip:command.zip,number:command.number,pSold:product.pSold,pPrice:product.pPrice},{   headers: {Authorization: `Bearer ${token}`} });
        if(addcmd.data.success){
            store.addNotification({
                title: "success",
                message: `${addcmd.data.success}`,
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
        else{
            console.log("error")
        }
        
        return addcmd
    }
    catch (error) {
        console.log(error);
      }
  }
  const SendCode =async()=>{
    if ( !command.cin || !command.number || !command.FirstName || !command.LastName ){
      setCommand({...command,error:{
        cin:"champ vide" ,number:"champ vide" ,FirstName:"champ vide",LastName:"champ vide"
      }

    })
    }
    else{
      setCount(count+1)
    try{
          let res = await axios.post("http://localhost:3002/api/verifynumber",{number:command.number})
          setCode(res.data.code)
                 console.log("msg",res.data.message)
          console.log("code",res.data.code)
          return res.data.message
   
        }
        catch(err){
      console.log(err)
    }
  }
  }
  const verifierCode =() =>{
    console.log(code)
    console.log(codeConfirmation)
    if ( codeConfirmation === code ){
      setCount(count+1)

    }
    else{
      store.addNotification({
        title: "error",
        message: `code confirmation incorrect`,
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
                                    {
                                        count < 1 ?
                                         <Row md={1} className="p-3" style={{textAlign:"center",borderTop:"1px solid"}}>
                                    <Col><Button variant="success"onClick={()=>setCount(count+1)}>demande d'achat</Button></Col>
                                      
                                    </Row> :""
                                    }
                                    {count > 0 ?
                                    <Row>
                                        <Container style={{boxShadow:"0px 0px 5px 1px"  }}>
                       
                                            <Row md={2} className="p-3" style={{textAlign:"center"}}>

                                                 <Col> <TextField id="standard-basic" label="Nom" 
                                                   onChange={
                                                    (e)=> setCommand({...command,
                                                   FirstName:e.target.value
                                                   })
                                                }
                                                value={command.FirstName}
                                                 />
                                      
                                                 </Col>
                                                 <Col> <TextField id="standard-basic" label="Prenom" 
                                                   onChange={
                                                    (e)=> setCommand({...command,
                                                   LastName:e.target.value
                                                   })
                                                }
                                                value={command.LastName}
                                                 /></Col>
                                                 
                                                 <Col  > <TextField id="standard-basic"  type="number" label="Cin" 
                                                   onChange={
                                                    (e)=> setCommand({...command,
                                                   cin:e.target.value
                                                   })
                                                }
                                                value={command.cin}
                                                 /></Col>
                                                 <Col> <TextField id="standard-basic"  type="number" label="numéro de telephone" 
                                                    onChange={
                                                        (e)=> setCommand({...command,
                                                            number:e.target.value
                                                       })
                                                    }
                                                    value={command.number}
                                                 /></Col>
                                         
                                            </Row>
                                            <Row>
                                            { command.error.FirstName ? <Alert variant="danger">{command.error.FirstName}</Alert> :"" }
                                          
                                            </Row>
                                            {  count == 1 ?
                                                                                       <Row className="w-50 m-auto p-3"><Button onClick={SendCode}>confirmer votre demande par SMS</Button></Row>

                                                :""    }
                                            {  count ==2 ?
                                             <>
                                            <Row md={1} className="p-3" style={{textAlign:"center"}}> <Col> <TextField id="standard-basic" label="message confirmation" onChange={(e)=> setCC(e.target.value)} value={codeConfirmation} /></Col></Row>
                                                <Col className="mt-3" style={{textAlign:"center"}}><Button onClick={verifierCode}>Suivant</Button></Col>  
                                            </>:""
                                            }
                                           
                                           { count>2 ?
                                                 <>
                                            <Row md={3} className="p-3" style={{textAlign:"center"}}>
                                            <Col> <TextField id="standard-basic" label="ville"
                                               onChange={
                                                (e)=> setCommand({...command,
                                               city:e.target.value
                                               })
                                            }
                                            value={command.city}
                                            />
                                            
                                            </Col>
                                            <Col> <TextField id="standard-basic" label="adresse" 
                                              onChange={
                                                (e)=> setCommand({...command,
                                               state:e.target.value
                                               })
                                            }
                                            value={command.state}
                                            /></Col>
                                            <Col> <TextField id="standard-basic" label="Code Postal"
                                             onChange={
                                                (e)=> setCommand({...command,
                                               zip:e.target.value
                                               })
                                            }
                                            value={command.zip}
                                            /></Col>
                                            
                                            </Row>
                                            <Row md={1}  className="p-3" style={{textAlign:"right"}}>
                                            <Col className=" mt-3"><Button variant="success" onClick={addCmd}>confirmer commande</Button></Col>  
                                            </Row>
                                            </> :""
                                           }
                                         
                                        </Container>
                                    </Row> :""
                                }
                                   
                                    
                                    
                    </div>
                                
                        

          </Modal.Body>
        
        </Modal>
     
      </>
    )
}
