import React from 'react';
import './App.css';
import  HomeAdmin from "./Admin/HomeAdmin"
import 'antd/dist/antd.css';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import {BrowserRouter,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./visiteur/Home";
import Header from "./visiteur/Header";
import ProduitsContainer from "./visiteur/ProduitsContainer"
import Connecter from "./visiteur/Connecter";
import SignUp from "./visiteur/SignUp";
import EntrepriseHome from './entreprise/EntrepriseHome';
import MesProduits from "./entreprise/MesProduits"
import MesCommandes from './entreprise/MesCommandes';
import Profile from "./entreprise/Profile";
import ChangerMDP from './entreprise/ChangerMDP';
import AjouterProduit from './entreprise/AjouterProduit';
import Sproduit from "./entreprise/componenent/Sproduit";
import Gallerie from "./client/Gallerie";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import HomeClient from './client/HomeClient';
import SProduitClient from "./client/component/SProduitClient";
import CommandeClient from "./client/CommandeClient";
import Gproduits from './Admin/Gproduits';
import Gentreprise from "./Admin/Gentreprise";
import Gutilisateur from "./Admin/Gutilisateur";
import Footer from "./visiteur/Footer"
import ScommandeClient from './client/component/ScommandeClient';
import ScommandeEnt from  "./entreprise/componenent/ScommandeEnt";
import SproduitVisiteur from "./visiteur/component/SproduitVisiteur";
import SProduitAdmin from "./Admin/component/SProduitAdmin";
function App() {
  
 const role = localStorage.getItem('role');
  return (
  <>
  
<Header />

   <ReactNotification />
  {
    role=="entreprise" ?
    <BrowserRouter>
    <Route path ="/Home_Entreprise" component={EntrepriseHome} />
    <Route path="/mesproduits" component={MesProduits} />
    <Route path="/mescommandes" component={MesCommandes} />
    <Route path="/Profile" component={Profile} />
    <Route path="/ChangerMDP" component={ChangerMDP} />
    <Route path="/mesproduits/ajouterProd" component={AjouterProduit} />
    <Route path="/produit_details/:idproduit" component={Sproduit} />
    <Route path="/mescommandes/Gcommande/:idcommand" component={ScommandeEnt} />
    <Footer />
    </BrowserRouter>

   
    :
    role =="user" ?
    <BrowserRouter>
    <Route path="/homeclient" component={HomeClient} />
    <Route path="/gallerie" component={Gallerie} />
    <Route path="/ChangerMDP" component={ChangerMDP} />
    <Route path="/produit_details/:idproduit" component={SProduitClient} />
    <Route path="/commandesclient" component={CommandeClient} />
    <Route path="/commandesclient/cmd/:IDC" component={ScommandeClient} />
    <Footer />
    </BrowserRouter>
    :
    role=="admin" ?
    <BrowserRouter>
    <Route path="/Home" component={HomeAdmin} />
    <Route path="/gestionProduits" component={Gproduits} />
    <Route path="/gestionEntreprise" component={Gentreprise} />
    <Route path="/gestiontilisateur" component={Gutilisateur} />
    <Route path="/gestionProduits/ProduitAdmin/:idprodAd" component={SProduitAdmin} />
    <Footer />

    </BrowserRouter> :
     <BrowserRouter>
  <Route path ="/home" component={Home}/>
  <Route path ="/produitsContainer" component={ProduitsContainer}/>
  <Route path ="/Home/connecter" component={Connecter}/>
  <Route path ="/Home/SignUp" component={SignUp}/>
  <Route path="/produit_details/:idproduit" component={SproduitVisiteur} />
  </BrowserRouter>

  }
 
<MessengerCustomerChat
    pageId="709124706592166"
    appId="167199762029666"
   
  />
  </>
  );
}
export default App;
