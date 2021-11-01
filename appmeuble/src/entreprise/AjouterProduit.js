import React,{useState} from 'react'
import {Offcanvas,Container,Row,Col,Form,Alert} from "react-bootstrap"
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { Upload, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios"
import { store } from 'react-notifications-component';


export default function AjouterProduit() {
    const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const [NewProduct, setProduct] = useState({
    pName: "",
    pDescription: "",     
    pImage: "",
    pCategory: "",
    pPrice: "",
    success: false,
    error: false,
  });
  console.log("newproduct",NewProduct);

const token = localStorage.getItem("token")
  const add = async (e) => {
    setProduct({...NewProduct})
    if (!NewProduct.pName || !NewProduct.pDescription ||!NewProduct.pImage || !NewProduct.pCategory || !NewProduct.pPrice){
      setProduct({...NewProduct,error:{
        pDescription:"champ vide",
        pName:"champ vide",
        pImage:"champ vide",
        pCategory:"champ vide",
        pPrice:"champ vide"
      }
    })
    } else {
      
    let formData = new FormData();
   
  formData.append("pName", NewProduct.pName);
  formData.append("pDescription", NewProduct.pDescription);
  formData.append("pCategory", NewProduct.pCategory);
  formData.append("pPrice", NewProduct.pPrice);
  formData.append("pImage", NewProduct.pImage);
  
  
    try{
      let ADDPRODUCT =  await axios.post(`http://localhost:3002/api/newproduct`,formData , {
        headers: {Authorization: `Bearer ${token}`} 
        
    });
    if(ADDPRODUCT.data.success){
      store.addNotification({
        title: "success!",
        message:`${ADDPRODUCT.data.success}`,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });
      setTimeout(() => {
        window.location.href="/mesproduits"
        
      },2000);
      
    }
    else{
      store.addNotification({
        title: "error!",
        message:`${ADDPRODUCT.data.error}`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });

    }
      
    }
    catch (err){
console.log(err)
    }
 }   }
    return (
<>
     

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Ajouter Produit</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Container className="p-3">
            <Form>
<Row> <TextField id="standard-basic" label="titre de Produit" 
  value={NewProduct.pName}
  onChange={(e) =>
    setProduct({
      ...NewProduct,
      error: false,
      success: false,
      pName: e.target.value,
    })
  }
/> </Row>
{
      !NewProduct.error.pName ? "" : <Alert variant="danger">{NewProduct.error.pName}</Alert>
    }
       
<Row className="mb-3">
<TextField
         
          select
          label="Categories"
          helperText="mettez le type de produit"
          onChange={(e) =>
            setProduct({
              ...NewProduct,
              error: false,
              success: false,
              pCategory: e.target.value,
            })
          }
        >
        <option value="sallon">sallon</option>
        <option value="chambre">chambre</option>
        <option value="bureau">bureau</option>
        <option value="jardin">jardin</option>
        <option value="enfants">enfants</option>
        <option value="décoration">décoration</option>

        </TextField>
</Row>
{
      !NewProduct.error.pCategory ? "" : <Alert variant="danger">{NewProduct.error.pCategory}</Alert>
    }
<Row>
<TextField
          id="outlined-textarea"
          label="Description"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          maxRows={4}
          value={NewProduct.pDescription}
     onChange={(e) =>
       setProduct({
         ...NewProduct,
         error: false,
         success: false,
         pDescription: e.target.value,
       })
     }
        />
</Row>
{
      !NewProduct.error.pDescription ? "" : <Alert variant="danger">{NewProduct.error.pDescription}</Alert>
    }
<Row><Col md={6} className="ms-auto mt-3">
<FormControl fullWidth >
          <InputLabel htmlFor="standard-adornment-amount">Prix de Produit</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">TND</InputAdornment>}
            value={NewProduct.pPrice}
            onChange={(e) =>
              setProduct({
                ...NewProduct,
                error: false,
                success: false,
                pPrice: e.target.value,
              })
            }
          />
        </FormControl>
</Col></Row>
<Row>
{
      !NewProduct.error.pPrice ? "" : <Alert variant="danger">{NewProduct.error.pPrice}</Alert>
    }

<Space className="mt-5" direction="vertical" style={{ width: '100%',textAlign: 'center'}} size="large">
    <Upload
      listType="picture"
      maxCount={1}
      onChange={(e) =>
        setProduct({
          ...NewProduct,
          error: false,
          success: false,
          pImage:e.fileList[0].originFileObj
        })
      }
    >
      <Button  icon={<UploadOutlined />}>Upload (Max: 1)</Button>
    </Upload>
    </Space>
</Row>
{
      !NewProduct.error.pImage ? "" : <Alert variant="danger">{NewProduct.error.pImage}</Alert>
    }
<Row className="m-5">
    <Button onClick={add}>ajouter Produit</Button>
</Row>
<Row></Row>
</Form>
        </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
    )
}
