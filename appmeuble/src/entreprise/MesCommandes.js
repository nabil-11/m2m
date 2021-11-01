import React ,{useState,useEffect} from 'react'
import {Container,Row,Col,Button} from "react-bootstrap"
import Commande from "./componenent/Commande"
import TextField from '@material-ui/core/TextField';
import axios from "axios"

export default function MesCommandes() {
    const[search,setSearch]=useState("")
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const[cmd,setcmd]=useState([''])
    const[etat,setetat]=useState('')
    const token = localStorage.getItem('token')
    useEffect(async() => {
        try {
            let res =  await axios.get(`http://localhost:3002/api/CmdManagement?limit=${page*4}&${!etat ?"":`etat=${etat}` }&FirstName[regex]=${search}`,
         {   headers: {Authorization: `Bearer ${token}`} 
        });
        if (res.data.cmd) {
          console.log("success")
          console.log(res.data.cmd)
          setcmd(res.data.cmd)
          setResult(res.data.result)
            return res
        }
      
      
        
        }
        catch (error) {
            console.log(error);
          }
    }, [page,search,etat])
    console.log(cmd)
   
    return (
       < >
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
                 <Row> <Button className="mt-5 mb-3" onClick={()=>setetat("attente")} size="sm" variant="primary">commandes en attente</Button></Row>
                 <Row><Button className="mt-3 mb-3"  onClick={()=>setetat("")} size="sm" variant="primary">tous les commandes</Button></Row>
                 <Row><Button className="mt-3 mb-3"  onClick={()=>setetat("accepter")} size="sm" variant="primary">commandes accepter</Button></Row>
                 <Row><Button className="mt-3 mb-3"  onClick={()=>setetat("refuser")} size="sm" variant="primary">commandes refuser</Button></Row>
                 </Container>

             </Col>
             <Col md={9}>
                
             <Container style={{boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px",maxHeight:"1300px",width:"100%",margin:"20px",borderRadius:"20px",padding:"20px",overflow:"auto"}}>
             <Row className="w-25 m-auto mb-5">
            <TextField id="standard-basic" label="Chercher" onChange={(e)=>setSearch(e.target.value)} />
            </Row>
            {cmd.map(commande => <Col> <Commande key={commande._id} commande={commande} /></Col>)}
                
                
            </Container>
            <Row><Button size="sm" onClick={() => setPage(page+1)} variant="primary w-25 m-auto mb-5">Plus</Button></Row>
             </Col>

         </Row>
    </Container>
    
       </>
    )
}
