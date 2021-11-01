import React ,{useState,useEffect} from 'react'
import {Col,Row,Container,Button} from "react-bootstrap"
import axios from "axios"
import Card from "./component/Card"
import TextField from '@material-ui/core/TextField';


export default function Gproduits() {
    const [product,setProduct]=useState([""])
    const[search,setSearch]=useState("")
    const[pCategory,setCategory]=useState('')
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('')
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`http://localhost:3002/api/home?limit=${page*4}&${!pCategory ?"":`pCategory=${pCategory}` }&${sort}&pName[regex]=${search}`)
            setProduct(res.data.products)
            console.log("defrfedeqferfer",product)
            setResult(res.data.result)
        }
        getProducts()
    },[ pCategory, sort, search, page])
    return (
     <>
     <Container  style={{backgroundImage:"url(https://images6.alphacoders.com/664/thumb-1920-664307.jpg)",height:"300px",width:"100%",paddingTop:"10%",textAlign:"center",marginTop:"70px"}}>
        <h1 style={{color:"white",fontWeight:"700"}} >Produits</h1>


     </Container>
     <Container>
         <Row>
             <Col md={3} className="p-4" style={{borderRight: '1px solid',marginTop: '20px' }}>
             <Row className="w-75 m-auto mb-3">
            <TextField id="standard-basic" label="Chercher"
            value={search}  onChange={e => setSearch(e.target.value.toLowerCase())}
            />
            </Row>
            <Row>
                <h5>categories</h5>
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
             </Col>
             <Col md={9}>
            <Row className="g-4 m-5 p-2" md={1} style={{boxShadow:"0px 0px 2px 1px ",height:"1500px",borderRadius:"20px",overflow:"auto"}}>
             {product.map(product =><Col className=""><Card product={product} /></Col>)}
              </Row>
           
              <Button className="loadmore d-block m-auto mb-3"   onClick={() => setPage(page+1)}>Load more</Button>

             </Col>
         </Row>

     </Container>
     </>
    )
}
