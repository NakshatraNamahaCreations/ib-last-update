import React from "react";
import Iframe from 'react-iframe'

export default function About() {
  const videoId = '0tSbv20hdWQ';

  return (
    <>
      <section className="section_about" style={{background: 'linear-gradient(to top, #193256 50%, white 70%)'}}>
      <Iframe src={`https://www.youtube.com/embed/${videoId}`}
        width="350px"
        height="150px"
        id=""
        className=""
        display="block"
        position="relative"/>
        <h2 className="about">About</h2>
        
       
        <p className="about__text">
        Welcome to InfinitiMart, 
        your gateway to a thriving digital marketplace! As a vendor-centered platform, 
        we empower businesses to effortlessly connect with genuine customers. 
        Our AI-powered app ensures swift and accurate automated quotations, 
        simplifying the user experience. 
        Our intuitive interface guides even novices through the process seamlessly.
         Subscription plans offer added benefits, 
         granting vendors instant invoices upon subscription, enhancing convenience.
          
        </p>
      </section>
    </>
  );
}
