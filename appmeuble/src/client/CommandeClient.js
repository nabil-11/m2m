import React ,{useEffect,useState} from 'react'
import {Container,Row,Col,Button} from "react-bootstrap"
import Commande  from "./component/Commande"
import TextField from '@material-ui/core/TextField';
import axios from "axios"



export default function CommandeClient() {
  const [command,setcommand] = useState([""])
  const[search,setSearch]=useState("")
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const[etat,setetat]=useState('')
let token = localStorage.getItem('token')
console.log(token)
useEffect(async() => {
let res= await axios.get(`http://localhost:3002/api/command/List?limit=${page*4}&${!etat ?"":`etat=${etat}` }&state[regex]=${search}`,{
      headers: {Authorization: `Bearer ${token}`} 
  }
)
if (res.data.cmd){
console.log(res.cmd)
setcommand(res.data.cmd)
setResult(res.data.result)

} else{
console.log("err")
}
}, [etat])  
console.log(command)
return (
        <>
        <div className="all-title-box"style={{boxShadow:"0 0 15px"}}>
      <div className="container">
          <div className="row">
              <div className="col-lg-12">
                  <h2> Liste des commandes</h2>
              </div>
              <h3 style={{color:"gold"}}></h3>
          </div>
      </div>
  </div>
  <Container className="w-100"> 
 

       <Row className="w-100">
           <Col md={3}>
               <Container style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px",height:"400px",width:"100%",margin:"20px",borderRadius:"20px",backgroundColor:" rgba(255, 255, 255, 0.500)"}}>
               <Row> <Button className="mt-5 mb-3" size="sm"  onClick={()=>setetat("attente")} variant="primary">commandes en attente</Button></Row>
               <Row><Button className="mt-3 mb-3" size="sm" onClick={()=>setetat("")} variant="primary">tous les commandes</Button></Row>
               <Row><Button className="mt-3 mb-3" size="sm" onClick={()=>setetat("accepter")} variant="primary">commandes accepter</Button></Row>
               <Row><Button className="mt-3 mb-3" size="sm" onClick={()=>setetat("refuser")} variant="primary">commandes refuser</Button></Row>
               </Container>

           </Col>
           <Col md={9} >
              
           <Container style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px",overflow:"auto",maxHeight:"1050px",width:"100%",margin:"20px",borderRadius:"20px",padding:"20px"}}>
      
          <Row md={1}>
                {
              command.map(commande =><Col><Commande key={commande._id} command={commande} />
              </Col> )
          }
          </Row>
        
            
               <Row><Button size="sm" variant="primary w-25 m-auto" onClick={() => setPage(page+1)}>Plus</Button></Row>
          </Container>
           </Col>

       </Row>
  </Container>
     </>
    )
}
