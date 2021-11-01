import React ,{useState,useEffect}from 'react'
import {Col,Row,Container,Table} from "react-bootstrap"
import ColTableClient from "./component/ColTableClient";
import axios from "axios"
export default function Gutilisateur() {
    const[clients,setClients]=useState([""])

    useEffect( async() => {
        let res = await axios.get(`http://localhost:3002/api/Guser`)
       setClients(res.data.clients)
    }, [""])
    console.log(clients)
    return(
       <>
        <Row className="w-100 m-auto" style={{height:'400px',backgroundImage:'url(https://images6.alphacoders.com/451/thumb-1920-451118.jpg)'}}>
           
 <h1 style={{textAlign:'center',marginTop:"20%",fontWeight:'700',color:"white"}}> consulter les clients</h1>
      </Row>
      <Row className="w-75 m-auto mt-5">
      <Table  className="text-white" size="sm">
  <thead>
    <tr>
      <th>nom</th>
      <th>email</th>
      <th>date creation</th>
    </tr>
    
  
  </thead>
  <tbody>
    {clients.map( client =><ColTableClient key={client._id} client={client} />)}
  </tbody>
</Table>

      </Row>
       </>
    )
}
