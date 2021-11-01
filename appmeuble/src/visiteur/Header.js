import React from 'react'
import { NavDropdown,Nav,Navbar,Container,Image } from 'react-bootstrap'
export default function Header() {
  const role = localStorage.getItem('role')
  const verify = localStorage.getItem('verify')
  console.log('role',role)

    const NavbarVisiteur= ()=>{
     return (
     <Navbar fixed="top"   className="visiteurHeader" expand="lg">
        <Container>
          <Navbar.Brand href="/Home" ><h1>M2M</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" style={{borderLeft: "1px solid black",paddingLeft:"100px"}}>
              <Nav.Link href="/Home" style={{backgroundColor:"black",borderRadius :"20px",color:"white",marginRight:"10px"}}>Accueil</Nav.Link>
              <Nav.Link href="/produitsContainer"style={{backgroundColor:"black",borderRadius :"20px",color:"white"}}>Produits</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown variant="dark" title="Se connecter" id="basic-nav-dropdown" >
                <NavDropdown.Item href="/Home/connecter">connecter</NavDropdown.Item>
                <NavDropdown.Item href="/Home/SignUp">créer un compte</NavDropdown.Item>
             
              </NavDropdown>  
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      )
  }
  const NavbarAdmin=()=>{
    const email = localStorage.getItem('email')
    function btn_logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      window.location.href="/home"
       
    
  }
    return(
      <Navbar className="navbarEnt" fixed="top" variant="dark" expand="lg" style={{boxShadow:"0px 0px 5px 1px"}}>
      <Container>
        <Navbar.Brand href="/Home_Entreprise">M2M</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Home"><i class="fas fa-home"></i> Home</Nav.Link>
            <Nav.Link href="/gestionProduits"><i class="fas fa-store-alt"></i> gestion Produits</Nav.Link>
            <Nav.Link href="/gestionEntreprise"><i class="fas fa-clipboard-list"></i> gérer les entreprises </Nav.Link>
            <Nav.Link href="/commandesclient"><i class="fas fa-clipboard-list"></i> gérer les commandes </Nav.Link>
            <Nav.Link href="/gestiontilisateur"><i class="fas fa-clipboard-list"></i> consulter les clients </Nav.Link>

           
          </Nav>
          <Nav>
           <NavDropdown title={`${email}`} id="basic-nav-dropdown"> 
              <NavDropdown.Item href="/ChangerMDP"style={{fontSize:"smaller"}}><i class="fas fa-unlock"></i> changer Mot de passe</NavDropdown.Item>
              <NavDropdown.Item onClick={btn_logout} style={{fontSize:"smaller"}}><i class="fas fa-sign-out-alt"></i>Déconnexion</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }
  const NavbarEntreprise =()=>{
    const email = localStorage.getItem('email')
    function btn_logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('verify');
      window.location.href="/home"
       
    
  }
    return(
    <Navbar className="navbarEnt"  variant="dark"  expand="lg">
    <Container>
      <Navbar.Brand href="/Home_Entreprise"style={{fontSize:"50px"}}>M2M |</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/Home_Entreprise" style={{color:"white"}}><i class="fas fa-home"></i> Home</Nav.Link>
          {verify=="true" ?
          <>
          <Nav.Link href="/mesproduits" style={{color:"white"}}><i class="fas fa-store-alt"></i> Mes Produits</Nav.Link>
          <Nav.Link href="/mescommandes" style={{color:"white"}}><i class="fas fa-clipboard-list"></i> mes commandes</Nav.Link>
        </> : ""
        }
          
         
        </Nav>
        <Nav  >
         <NavDropdown  title={`${email}`} id="basic-nav-dropdown"> 
            <NavDropdown.Item href="/Profile" style={{fontSize:"smaller"}}><i class="fas fa-user-circle"/> Profile</NavDropdown.Item>
            <NavDropdown.Item href="/ChangerMDP"style={{fontSize:"smaller"}}><i class="fas fa-unlock"></i> changer Mot de passe</NavDropdown.Item>
            <NavDropdown.Item onClick={btn_logout} style={{fontSize:"smaller"}}><i class="fas fa-sign-out-alt"></i>Déconnexion</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    )
  }
  const NavbarClient=()=>{
    const email = localStorage.getItem('email')
    function btn_logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      window.location.href="/home"
       
    
  }
    return(
    <Navbar fixed="top" className="navbarEnt" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/gallerie" className="text-white" style={{fontSize:"50px"}}>M2M |</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          
                  
          <Nav.Link href="/gallerie"className="text-white"><i class="fas fa-store-alt"></i> Gallerie</Nav.Link>
          <Nav.Link href="/commandesclient"className="text-white"><i class="fas fa-clipboard-list"></i> commandes</Nav.Link>
        
         
        </Nav>
        <Nav>
         <NavDropdown title={`${email}`} id="basic-nav-dropdown"> 
            <NavDropdown.Item href="/ChangerMDP"style={{fontSize:"smaller"}}><i class="fas fa-unlock"></i> changer Mot de passe</NavDropdown.Item>
            <NavDropdown.Item onClick={btn_logout} style={{fontSize:"smaller"}}><i class="fas fa-sign-out-alt"></i>Déconnexion</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    )

  }
    return (
   <>
     {
       role=="entreprise" ? NavbarEntreprise() : role=="admin" ? NavbarAdmin() : role=="user" ? NavbarClient(): NavbarVisiteur()
     }
   </>
    
    )
}
