import React from 'react'
import moment from "moment"

export default function ColTableClient(props) {
    return (
        <tr className="text-black">
      
        <td>{props.client.name}</td>
        <td>{props.client.email}</td>
        
        <td>{moment(props.client.createdAt).startOf('hour').fromNow()  }</td>
      </tr>
     
    )
}
