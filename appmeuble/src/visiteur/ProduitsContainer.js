import React,{useEffect,useState} from 'react'
import { Row,Col,Form,Container,Button,FormControl,Navbar,NavDropdown,Nav } from 'react-bootstrap'
import vd from "../assets/vd.mp4"
import axios from "axios"
import VisiteurCard from "./component/visiteurCard"
import Footer from "./Footer";


export default function ProduitsContainer() {
    const [products, setProducts] = useState([""])
  const [pCategory, setCategory] = useState("")
  const [sort, setSort] = useState('')
  const [search,setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [result, setResult] = useState(0)

  useEffect(() =>{
    const getProducts = async () => {
        const res = await axios.get(`http://localhost:3002/api/home?limit=${page*4}&${!pCategory ?"":`pCategory=${pCategory}` }&${sort}&pName[regex]=${search}`)
        setProducts(res.data.products)
        console.log("defrfedeqferfer",products)
        setResult(res.data.result)
    }
    getProducts()
},[ pCategory, sort, search, page])

    

    return (
       <>
            <div  className="videoContainer w-100 mb-5" style={{marginTop:"60px"}} >
               
                <video autoPlay loop muted   className="video w-100" style={{ backgroundSize:"cover", position:"absolute",opacity:"0.8",zIndex:"-1"}}  >
                    <source src={vd} />
                </video>
                <div className="overlayvideo" >
                   
                    <Form >
          <FormControl type="text" placeholder="chercher" className="chercheZone" value={search} onChange={(e)=>setSearch(e.target.value)} style={{borderRadius:"10px"}}  />
          <Button variant="outline-light"  style={{borderRadius:"10px",marginTop:"10px"}}  href="#pcontainer" value={search}  onChange={e => setSearch(e.target.value.toLowerCase())}>Chercher </Button>
        </Form> 
    
    
    
                </div>
              
               
    <Container className="Chome"  style ={{boxShadow:"0 0 35px #ddd",marginTop:"100px",paddingBottom:"20px",height:"auto",borderRadius:"20px"}}>
            <Row style={{padding:"20px"}} >
              <Form className="d-flex">
              <Col md={2}><h1>M2M</h1></Col>  
        <Col md={3} className="ms-auto">
         <Form.Control  style={{margin :"10px",fontSize :"smaller",borderRadius :"10px"}}
            as="select"
            className="mr-sm-2 "
            id="inlineFormCustomSelect"
            custom 
            onChange={ e => {
              setSort(e.target.value)} }
    
            
            >
                <option value=''>Newest</option>
                        <option value='sort=oldest'>Oldest</option>
                        <option value='sort=-pSold'>Best sales</option>
                        <option value='sort=-pPrice'>Price: Hight-Low</option>
                        <option value='sort=pPrice'>Price: Low-Hight</option>
          </Form.Control>
        </Col>   
        
       
            </Form>  
            </Row>
            <Row className="w-100" id="pcontainer">

<Navbar bg="dark" expand="lg" variant="dark" className="w-75 ms-auto" style={{borderRadius:"10px"}}>
<Container>
<Navbar.Brand href="">CATEGORIES</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
<Nav className="ms-auto">
<Nav.Link onClick={()=>setCategory("chambre") & setSearch('')} >chambre</Nav.Link>
<Nav.Link onClick={()=>setCategory("jardin") & setSearch('')}>jardin</Nav.Link>
<Nav.Link onClick={()=>setCategory("sallon") & setSearch('')}>enfants</Nav.Link>
<Nav.Link onClick={()=>setCategory("sallon") & setSearch('')}>sallon</Nav.Link>
<Nav.Link onClick={()=>setCategory("bureau") & setSearch('')}>bureau</Nav.Link>

</Nav>
</Navbar.Collapse>
</Container>
</Navbar>
</Row>
{products.length > 0 ? <Row md={2} className="g-3 mt-3"style={{overflow: 'auto',maxHeight:"900px"}}>
         
            {products.map( product =><Col key={product._id}><VisiteurCard product={product}   style ={{boxShadow:"0 0 15px #ddd"}}/></Col>)}
            </Row>:
             <p className="mt-5" style={{color:"GrayText",textAlign:"center"}}>[aucun produit]</p>}
            
      
  
      <Button className="loadmore d-block m-auto mt-3" variant="light"  onClick={() => setPage(page+1)}>Load more</Button>
    
    </Container> 
          
            </div>
  <Footer />  </>  )
}
