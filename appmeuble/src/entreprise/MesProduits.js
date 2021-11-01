import React,{useState,useEffect} from 'react'
import "./entreprise.css"
import {Row,Col,Container,Offcanvas,Button} from "react-bootstrap"
import TextField from '@material-ui/core/TextField';
import CardGallery from './componenent/CardGallery';
import axios from "axios"


export default function MesProduits() {
    const Ename = localStorage.getItem('name')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [myproduct,setmyproduct]=useState([])
    const[search,setSearch]=useState("")
    const[pCategory,setCategory]=useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const[nbr,snbr]=useState("")
    useEffect(async() => {
        const token = localStorage.getItem("token")
        try {
        await axios.get(`http://localhost:3002/api/myshop?limit=${page*4}&${!pCategory ?"":`pCategory=${pCategory}` }&pName[regex]=${search}`,{
          headers: {Authorization: `Bearer ${token}`} 
      }
      ).then((res) => {
        setmyproduct(res.data.products)
        setResult(res.data.result)
        snbr(res.data.nbr)
      });
     } catch(err){
     console.log(err)
     }
     }, [ pCategory, search, page])
     console.log(myproduct)
    return (
       <>
       <div className="all-title-box"style={{boxShadow:"0 0 15px"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h2> espace Personnel de votre entreprise</h2>
                </div>
                <h3 style={{color:"gold"}}>{Ename}</h3>
            </div>
        </div>
    </div>
    <Container className="w-100">
         <Row className="w-100">
             <Col md={3}>
                 <Container className="p-3" style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px",height:"400px",width:"100%",margin:"20px",borderRadius:"20px"}}>
                  <Row className="mt-5">
                      <h5 className="text-center"> nombre des produits </h5>
                  </Row>
                  <Row>
                  <i className="fab fa-product-hunt text-center" style={{fontSize:"100px"}}></i>
                  </Row>
                  <Row className="mt-3" >
                      <h5 className="text-center">{nbr}</h5>
                  </Row>
                 </Container>

             </Col>
             <Col md={9}>
                
             <Container style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px",maxHeight:"1000px",width:"100%",margin:"20px",borderRadius:"20px"}}>
              <Row style ={{padding:"20px",borderBottom:"1px solid gray"}}>
                    <Col md={4} style={{textAlign:"center"}}>
                            <Button variant="secondary"  onClick={handleShow}>
      categories
      </Button>
                    </Col>
                    
            

      <Offcanvas placement="end" show={show} onHide={handleClose} className="categorieBar text-white">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
            <Row className=" w-50 m-auto mb-5">
            <TextField id="standard-basic" label="Chercher" 
            value={search}  onChange={e => setSearch(e.target.value.toLowerCase())}
            />
            </Row>
            <Row className="p-2">
                <Button className="m-auto" variant="outline-light"style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}} onClick={()=>setCategory("sallon") & setSearch('')}> Salon</Button>
            </Row>
            <Row className="p-2">
                <Button className="m-auto" variant="outline-light"style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}onClick={()=>setCategory("chambre") & setSearch('')}> Chambres</Button>
            </Row>
            <Row className="p-2">
                <Button className="m-auto" variant="outline-light"style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}} onClick={()=>setCategory("enfants") & setSearch('')}> Enfants</Button>
            </Row>
            <Row className="p-2">
                <Button className="m-auto" variant="outline-light"style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}} onClick={()=>setCategory("bureau") & setSearch('')}> Bureau</Button>
            </Row>
            <Row className="p-2">
                <Button className="m-auto" variant="outline-light"style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}} onClick={()=>setCategory("jardin") & setSearch('')}> Jardin</Button>
            </Row>
   
        </Offcanvas.Body>
      </Offcanvas>
      <Col md={8} style={{textAlign:"right"}}>
          <Button href="/mesproduits/ajouterProd">Ajouter Produit</Button>
                    </Col>
                 </Row > 
                 <Container style={{overflow:"auto",maxHeight:"700px"}}>
                      {myproduct.length > 0 ?  <Row  xs={1} md={1} className="g-3" >
                      {myproduct.map( product =><CardGallery key={product.id} product={product}/>)}
                  
                             </Row>
                             :
                             <p className="mt-5" style={{color:"GrayText",textAlign:"center"}}>[aucun produit]</p>
                 
                }
                     
                 </Container>
                
                 <Row>
                     <Button className="w-25 m-auto mt-3 mb-3"  onClick={() => setPage(page+1)} >Plus</Button>
                 </Row>
                     
                 
                 
            </Container>
             </Col>

         </Row>
    </Container>
    
       </>
    )
}
