import React ,{useState,Container} from 'react'
import {Modal} from "react-bootstrap"
export default function ImageV() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>code fiscale par image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
        <img src={`http://localhost:3002/uploads/verify/`} className="img-fluid" />
      </Container>  </Modal.Body>
       
      </Modal>
    )
}
