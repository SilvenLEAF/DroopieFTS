import React from 'react'
import { NavLink } from 'react-router-dom'






export const HeaderMobileLinks = () => {
  
  return (
    <>
      <li><NavLink to="/" className="sidenav-close" ><i className="fa fa-home"></i>Home</NavLink></li>
      <li><NavLink to="/sync?code=PAdE69m2tqAAAAAAAAAAaLTYVAZEfODCozjeDwkgfVg" className="sidenav-close" ><i className="fa fa-cogs"></i>Sync</NavLink></li>
      <li><NavLink to="/files" className="sidenav-close" ><i className="fa fa-file"></i>Files List</NavLink></li>
      <li><a target="_blank" rel="noopener noreferrer" href="https://silvenleaf.github.io" className="sidenav-close" ><i className="fa fa-info"></i>About Me</a></li>
    </>
  )
}







export const HeaderPCLinks = () => {
  return (
    <>
      <li><NavLink to="/" >Home</NavLink></li>
      <li><NavLink to="/sync?code=PAdE69m2tqAAAAAAAAAAaLTYVAZEfODCozjeDwkgfVg">Sync</NavLink></li>           
      <li><NavLink to="/files">Files List</NavLink></li>           
      <li><a target="_blank" rel="noopener noreferrer" href="https://silvenleaf.github.io" >About Me</a></li>
    </>
  )
}