import React from 'react'
import {
    Col,Row
} from "react-bootstrap"

export default function Footer() {
    return (
        <section className="footer w-100"  id="contact" style={{boxShadow:"0px 5px 10px 0px"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h4 className="section-heading" style={{margin:"20px",color:"white",fontSize:"50px"}}>m2m a votre service</h4>
              <hr className="my-4"/>
              <p className="mb-5"></p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 ml-auto text-center">
              <i className="fa fa-phone fa-3x mb-3 sr-contact"></i>
              <p>+216 99 611 804</p>
            </div>
            <div className="col-lg-4 mr-auto text-center">
              <i className="fa fa-envelope-o fa-3x mb-3 sr-contact"></i>
              <p>
                <a >bdh.nabil@gmail.com</a>
              </p>
            </div>
            <div className="col-lg-4 mr-auto text-center">
            <i class="fas fa-copyright fa-3x mb-3 "></i>
              <p>
                <p>copyright by Nabil Bdhyef</p>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}
