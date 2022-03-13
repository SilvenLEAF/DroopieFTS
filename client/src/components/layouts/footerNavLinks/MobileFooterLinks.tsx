import React from 'react'
import { Link } from 'react-router-dom'




function MobileFooterLinks() {
  return (
    <>
      <div>
        <div className="myFooterIcons">
          <Link to="/" >
            <i className="fa fa-home"></i> Home
          </Link>
        </div>
      </div>




      <div>
        <div className="myFooterIcons">
          <Link to="/sync?code=PAdE69m2tqAAAAAAAAAAaLTYVAZEfODCozjeDwkgfVg" >
            <i className="fa fa-cogs"></i> Sync
          </Link>
        </div>
      </div>



      <div>
        <div className="myFooterIcons">
          <Link to="/files" >
            <i className="fa fa-file"></i> Files
          </Link>
        </div>
      </div>
    </>
  )
}

export default MobileFooterLinks
