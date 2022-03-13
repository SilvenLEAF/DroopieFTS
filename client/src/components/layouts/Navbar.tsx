import M from 'materialize-css'
import React, {  useEffect } from 'react'

import { Link } from 'react-router-dom'
import { HeaderMobileLinks, HeaderPCLinks } from './navLinks/HeaderNavLinks';






function Navbar() {  
  useEffect(()=>{
    M.AutoInit();
  }, [])


  const mobileLink = <HeaderMobileLinks/>;
  const pcLink = <HeaderPCLinks/>;


  return (
    <nav id="myNavbar" className="nav nav-wrapper scrollspy">
      <div className="container">

        <Link to= "/" className= "brand-logo">DroopieFTS</Link>
        <div className="sidenav-trigger hide-on-large-only" data-target= "mobilenav" id="myHam">
            <i className="fas fa-hamburger"></i>
        </div>



        <ul className="sidenav" id="mobilenav">
          { mobileLink }            
        </ul>

        

        <ul className="right hide-on-med-and-down">
          { pcLink }
        </ul>

      </div>
    </nav>
  )
}

export default Navbar
