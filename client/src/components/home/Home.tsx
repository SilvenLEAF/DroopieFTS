import M from 'materialize-css'
import '../../styles/Home.scss';

import React, { useEffect } from 'react'



function Home() {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div className="container" >

      <div id="myLandingIcon"></div>
      <div className="myLandingContentHolder">
        <h1 id="myLandingTitle" className="pageTitle">
          DroopieFTS
        </h1>

        <div className="myLandingDescription">
          Welcome to this wonderful project of FTS Search
        </div>

        <div className="myLandingBtnHolder">
          <a href="https://www.dropbox.com/oauth2/authorize?client_id=qllo1yevg69ubwg&redirect_uri=http://localhost:5500/sync&response_type=code"
          className="btn myBtn waves-effect waves-light myLandingBtn"
          >Connect Dropbox</a>
        </div>
      </div>
    </div>
  )
}

export default Home;