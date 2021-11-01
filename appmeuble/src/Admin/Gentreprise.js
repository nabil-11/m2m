import React ,{useState,useEffect }from 'react'
import {Table,Container} from "react-bootstrap"
import ColTable from "./component/ColTable";
import axios from 'axios';

export default function Gentreprise() {
  
    const [entreprise,setEntreprise]=useState([""])

    /************************** */
   
   
    /***************************** */

    
      useEffect( async() => {
          let res = await axios.get(`http://localhost:3002/api/Gentreprise`)
          setEntreprise(res.data.entreprise)
      }, [""])
      console.log(entreprise)
    return (
        <>
          <Container  style={{backgroundImage:"url(https://images2.alphacoders.com/720/thumb-1920-720115.png)",height:"300px",width:"100%",paddingTop:"10%",textAlign:"center",marginTop:"70px"}}>
        <h1 style={{color:"white"}} >gestion entreprises</h1>
     </Container>
        <Container className="p-5" >
        <Table  className="text-white">
        <thead>
          <tr >
             <th>date creation</th>
            <th>Nom Entreprise</th>
            <th>localisation</th>
            <th>image de verification</th>
            <th>verification </th>
            <th>supprimer user</th>
          </tr>
        </thead>
        <tbody className="text-white">

            {entreprise.map( ent => <ColTable ent={ent} key={ent._id} />   )}
   
       
        </tbody>
      </Table>

      </Container>
      
      </>
    )
}
