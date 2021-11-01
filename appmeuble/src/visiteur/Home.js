import React from 'react'
import { Row,Col,Container,Carousel,Image } from 'react-bootstrap'
import Footer from "./Footer";
import "./visiteur.css"

export default function Home() {
    return (
        <>
           
            <header className="masthead">
            <div className="container">
                <div className="masthead-subheading">Bienvenue Chez M2M!</div>
                <div className="masthead-heading text-uppercase">Nous sommes à votre service</div>
                <a className="btn btn-outline-light btn-xl text-uppercase" href="#services">Plus d'information
</a>
            </div>
        </header>
        <section className="page-section p-5 " id="services">
            <div className="container " >
                <div className="text-center">
                    <h1 className="section-heading text-uppercase text-light mb-5">Services</h1>
                    <h3 className="section-subheading text-muted text-light bg-light p-3 rounded-pill">
Les services fournis par ce site</h3>
                </div>
                <div className="row text-center">
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-dark"></i>
                            <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3 text-light">E-Commerce</h4>
                        <p className="">
                        Le commerce électronique ou e-commerce (parfois écrit comme eCommerce) est un modèle commercial qui permet aux entreprises et aux particuliers d'acheter et de vendre des choses sur Internet</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-dark"></i>
                            <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3 text-light">Responsive Design</h4>
                        <p className="">Le Responsive Web Design (RWD) ajuste automatiquement l’affichage d’une page web à la taille d’écran du terminal utilisé. Cette technique de conception de site web, ou d’interface digitale, répond à un besoin des utilisateurs</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-dark"></i>
                            <i className="fas fa-lock fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3 text-light">Web Security</h4>
                        <p className="">En général, la sécurité Web fait référence aux mesures de protection et aux protocoles que les organisations adoptent pour protéger l'organisation contre les cybercriminels et les menaces qui utilisent le canal Web. La sécurité Web est essentielle à la continuité des activités et à la protection des données, des utilisateurs et des entreprises contre les risques</p>
                    </div>
                </div>
            </div>
        </section>
        <section>
        <Carousel variant="light" className="homeCarousel">
        
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://i.pinimg.com/564x/d4/56/45/d45645605fd38f1ac502dbd83dcce38b.jpg"
      alt="First slide"
      style={{height:"700px",backgroundSize:"cover",backgroundAttachment:"fixed"}}
    />
    <Carousel.Caption className="carousel-caption-home">
    <h2>Nous attirons le meilleur produit pour vous</h2>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://i.pinimg.com/564x/3e/f4/df/3ef4df8086fc42e591481b5d1361ad8e.jpg"
      alt="Second slide"
      style={{height:"700px",backgroundSize:"cover", backgroundAttachment:"fixed", 
      backgroundPosition: "bottom"}}
    />
    <Carousel.Caption  className="carousel-caption-home">
    <h2>Nous attirons le meilleur produit pour vous</h2>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.marchedumeuble.ch/wp-content/uploads/2018/04/bureau1.jpg"
      alt="Third slide"
      style={{height:"700px",backgroundSize:"cover", backgroundAttachment:"fixed"}}
    />
      <Carousel.Caption  className="carousel-caption-home">
    <h2>Nous attirons le meilleur produit pour vous</h2>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

        </section>
       
      
           
                <Footer />
    
           
       
            
        </>
    )
}
