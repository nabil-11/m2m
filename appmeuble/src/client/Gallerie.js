import React ,{useState,useEffect} from 'react'
import {Container,Row,Col,Button,Offcanvas} from "react-bootstrap"
import TextField from '@material-ui/core/TextField';
import CardClient from "./component/CardClient";
import axios from "axios"

export default function Gallerie() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [product,setproduct]=useState([])
    const[search,setSearch]=useState("")
    const[pCategory,setCategory]=useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const [sort, setSort] = useState('')

    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`http://localhost:3002/api/home?limit=${page*4}&${!pCategory ?"":`pCategory=${pCategory}` }&${sort}&pName[regex]=${search}`)
            setproduct(res.data.products)
            console.log("defrfedeqferfer",product)
            setResult(res.data.result)
        }
        getProducts()
    },[ pCategory, sort, search, page])
    



    return (
       <>
       <Row className="w-100 m-auto" >
           <Container  className="w-100"style={{height:"500px",width:"100%",marginTop:"100px",backgroundImage:"url(https://www.marchedumeuble.ch/wp-content/uploads/2018/04/chambre37.jpg)"}}>
               <div style={{backgroundColor:"black",borderRadius:"20px",margin:"100px"}}>
                     <h1 style={{marginTop:"10%",textAlign:"center",color:"white"}}>Gallerie</h1>
                    
               </div>
               <Row>
                   <Button className="w-25 m-auto" href="#cproduit" variant="dark" style={{borderRadius:"10px"}}>Produits</Button>
               </Row>
          
           </Container>

       </Row>
     
         <Container id="cproduit" >
         <Row style ={{padding:"20px",borderBottom:"1px solid gray"}}>
                    <Col md={4} style={{textAlign:"center"}}>
                            <Button variant="secondary"  onClick={handleShow}>
      categories
      </Button>
                    </Col>
                    
            

      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Row className="w-50 m-auto mb-5">
            <TextField id="standard-basic" label="Chercher"
            value={search}  onChange={e => setSearch(e.target.value.toLowerCase())}
            />
            </Row>
            <Row className="p-2">
                <Button className="m-auto" variant="light"style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}} onClick={()=>setCategory("sallon") & setSearch('')}> Salon</Button>
            </Row>
            <Row className="p-2">
                <Button className="m-auto" variant="light"style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}onClick={()=>setCategory("chambre") & setSearch('')}> Chambres</Button>
            </Row>
            <Row className="p-2">
                <Button className="m-auto" variant="light"style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}} onClick={()=>setCategory("enfants") & setSearch('')}> Enfants</Button>
            </Row>
            <Row className="p-2">
                <Button className="m-auto" variant="light"style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}} onClick={()=>setCategory("bureau") & setSearch('')}> Bureau</Button>
            </Row>
            <Row className="p-2">
                <Button className="m-auto" variant="light"style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}} onClick={()=>setCategory("jardin") & setSearch('')}> Jardin</Button>
            </Row>
   
        </Offcanvas.Body>
      </Offcanvas>
      </Row>
      <Row className="w-100">
      <Container className=" m-auto" style={{overflow:"auto",maxHeight:"700px",borderLeft:"1px solid grey",width:"90%"}}>
                      {product.length > 0 ?  <Row  xs={1} md={2} className="g-3 pt-3" >
                      {product.map( product =><Col><CardClient key={product.id} product={product}/></Col>)}
                  
                             </Row>
                             :
                             <p className="mt-5" style={{color:"GrayText",textAlign:"center"}}>[aucun produit]</p>
                 
                }
                     
                 </Container>
                
                 <Row>
                     <Button className="w-25 m-auto mt-3 mb-3"  onClick={() => setPage(page+1)} >Plus</Button>
                 </Row>
                     
                 
                 
           
      </Row>

         </Container>
      
       
      
       </>
    )
}
