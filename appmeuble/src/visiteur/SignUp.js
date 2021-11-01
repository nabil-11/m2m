import React,{useState} from 'react'
import { Offcanvas,Form,Row,Col,FloatingLabel,Alert } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Upload, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

import axios from "axios"



export default function SignUp() {

  const[Enterprise,setEnterprise]=useState({
    name :'',
    email:'',
    password:'',
    cPassword:'',
    location:"",
    verifyImage:"",
    phone:"",
    UserType :"user",
    error: false,  
    success:false,



});
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        window.location.href="/Home"
    }
  
    const [ModeEntreprise,setModeEntreprise]=useState(false)
      const handleChange =()=>{
          setModeEntreprise(!ModeEntreprise)
         if(!ModeEntreprise){
          setEnterprise({ ...Enterprise,UserType:"entreprise"})
         }
         else{
          setEnterprise({ ...Enterprise,UserType:"user"})
         }

      }
      const handlesubmit =async(e) =>{

        setEnterprise({ ...Enterprise})

        if (!Enterprise.name || !Enterprise.email || !Enterprise.password || !Enterprise.cPassword) {
         setEnterprise({ ...Enterprise, error:{
            name: "Filed must not be empty",
            email: "Filed must not be empty",
            password: "Filed must not be empty",
            cPassword: "Filed must not be empty",}
          })
        }
          else{
            if(ModeEntreprise && !Enterprise.verifyImage){
              setEnterprise({ ...Enterprise, error:{
                 verifyImage:"Filed must not be empty",
              } })
            }
     else{ 
       if(Enterprise.password != Enterprise.cPassword){

        setEnterprise({ ...Enterprise, error:{
        
          cPassword:"mot de passe incorrect",
       } })

       }else{

       

     
        let userData = new FormData();
   
  userData.append("name", Enterprise.name.toUpperCase());
  userData.append("email",Enterprise.email);
  userData.append("password", Enterprise.password);
  userData.append("phone", Enterprise.phone);
  userData.append("role", Enterprise.UserType)
  userData.append("verifyImage", Enterprise.verifyImage);
  userData.append("location",Enterprise.location.toUpperCase() );
        let ApiSignUp = await axios.post(`http://localhost:3002/user/signup`,userData);
        console.log("signup",ApiSignUp.data)
        try {
          
          if (ApiSignUp.data.error) {
            setEnterprise({
              ...Enterprise,
              loading: false,
              error: ApiSignUp.data.error,
              password: "",
              cPassword: "",
            });
          } else if (ApiSignUp.data.success) {
            setEnterprise({
              success: ApiSignUp.data.success,
              name: "",
              email: "",
              password: "",
              cPassword: "",
              location:"",
              loading: false,
              error: false,
            });

        store.addNotification({
          title: "success!",
          message:`inscription reussi voulez connecter`,
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
            
           setTimeout( function () {
             window.location.href = "/Home/connecter"
           },2000)
          
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    }
      }
   console.log("entreprise",Enterprise)
      
    return (
        <>
        <Offcanvas  placement="end"show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>créer un compte</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>

                      <Form  noValidate autoComplete="off"  >
                          <Row>
                          <FormControlLabel
        control={<Switch checked={ModeEntreprise} onChange={handleChange} name="checkedA" />}
        label={ModeEntreprise ?"entreprise":"Client"}
      />
                          </Row>
                         <div style={{borderBottom: "1px solid",padding: "20px"}}>
                          <h4>Données personnelles</h4>
                          {!ModeEntreprise ? <Row>
                              <Col md={6}><TextField  id="standard-basic" label="Nom"
                              
                               onChange={(e)=>{
                                setEnterprise({...Enterprise,
                                    name:e.target.value})
                            }}
                            value={Enterprise.name}
                            
                              />

                              </Col>
                          

                          </Row> :""
                          }
                          <Row>
  
    </Row>
                         
                          <Row>
                          <Col md={6}><TextField id="standard-basic" label="Email" type="email" helperText="Some important text" 
                          onChange={(e)=>{
                            setEnterprise({...Enterprise,
                                email:e.target.value})
                        }}
                        value={Enterprise.email}
                          /></Col>
                          </Row>
                          {
      !Enterprise.error.email ? "" : <Alert variant="danger">{Enterprise.error.email}</Alert>
    }
                          <Row>
                          <Col md={6}><TextField id="standard-password" type="password" label="mot de passe"
                             onChange={(e)=>{
                              setEnterprise({...Enterprise,
                                  password:e.target.value})
                          }}
                          value={Enterprise.password}
                         
                           /></Col>
                          </Row>
                          {
      !Enterprise.error.password ? "" : <Alert variant="danger">{Enterprise.error.password}</Alert>
    }
              <Row> <Col md={8}><TextField id="standard-password" type="password" label="Repter mot de passe"
              
                 
     onChange={(e)=>{
      setEnterprise({...Enterprise,
          cPassword:e.target.value })
  }}
  value={Enterprise.cPassword}/></Col></Row>
                          {
      !Enterprise.error.cPassword ? "" : <Alert variant="danger">{Enterprise.error.cPassword}</Alert>
    }
                          <Row></Row>  </div>
                     {ModeEntreprise ? <> <div style={{padding: "20px"}}>
                          <h4>Données d'entreprise</h4>
                          <Row>
                          <TextField id="standard-basic" label="Nom d'entreprise" 
                            onChange={(e)=>{
                              setEnterprise({...Enterprise,
                                  name:e.target.value})
                          }}
                          value={Enterprise.name}
                          
                          />
                          </Row>
                          {
      !Enterprise.error.name ? "" : <Alert variant="danger">{Enterprise.error.name}</Alert>
    }
                          <Row>
                              <TextField id="standard-basic" label="numéro téléphonique du entreprise"
                                 onChange={(e) =>
                                    setEnterprise({
                                      ...Enterprise,
                                      error: false,
                                      success: false,
                                      phone: e.target.value,
                                    })
                                  }
                                  value={Enterprise.phone}
                              />
                           
                          </Row>

                          <Row>
                          <Col size="sm" style={{padding: "10px",margin:"10px"}}>
                                <FloatingLabel controlId="floatingSelectGrid" label="selectionnez votre ville">
                                <Form.Select aria-label="Floating label select example"
                                   onChange={(e) =>
                                    setEnterprise({
                                      ...Enterprise,
                                      error: false,
                                      success: false,
                                      location: e.target.value,
                                    })
                                  }
                                >
                                <option value="">toute la tunisie</option>
                                <option value="Ariana">Ariana</option>
                                <option value="Beja">Beja</option>
                                <option value="BenArous">BenArous</option>
                                <option value="Bizerte">Bizerte</option>
                                <option value="Gabes">Gabes</option>
                                <option value="Gafsa">Gafsa</option>
                                <option value="Jendouba">Jendouba</option>
                                <option value="Kairouan">Kairouan</option>
                                <option value="kasserine">kasserine</option>
                                <option value="Kebili">Kebili</option>
                                <option value="Manouba">Manouba</option>
                                <option value="Kef">Kef</option>
                                <option value="Mahdia">Mahdia</option>
                                <option value="Medenine">Mednine</option>
                                <option value="Monastir">Monastir</option>
                                <option value="Nabeul">Nabeul</option>
                                <option value="Sfax">Sfax</option>
                                <option value="SidiBouzid">SidiBouzid</option>
                                <option value="Siliana">Siliana</option>
                                <option value="Tataouine">Tataouine</option>
                                <option value="Tozeur">Tozeur</option>
                                <option value="Tunis">Tunis</option>
                                <option value="Zaghouan">Zaghouan</option>      
                                </Form.Select>
                                </FloatingLabel>
                            </Col>
                          </Row>
                          <Row>
                              <Col md={6} className="m-auto">
                          <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <Upload
                            listType="picture"
                            maxCount={1}
                            onChange={(e) =>
                              setEnterprise({
                                ...Enterprise,
                                error: false,
                                success: false,
                                verifyImage:e.fileList[0].originFileObj
                              })
                            }
                            >
                            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                            </Upload>
                            </Space>
                                                {
      !Enterprise.error.verifyImage ? "" : <Alert variant="danger">{Enterprise.error.verifyImage}</Alert>
    }
                         </Col>
                          </Row>
      
                        
                     
                            </div>
                            </>
                            : ""

                     }
                            <Row>
                        <Col md={6} className="m-auto text-center">
                          
                         
                          
                           <Button onClick={handlesubmit} type="submit" style={{margin:"10px"}}>créer compte</Button>

                        </Col>
                      </Row> 
                      
                      </Form>
                    
                          
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
}
