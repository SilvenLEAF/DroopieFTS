import M from 'materialize-css'
import '../../styles/ActionPage.scss';
import '../../styles/Form.scss';


import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Toast } from '../../helpers/MyAlerts';



function SyncPage() {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const [error, setError] = useState('');


  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const userGivenCode = urlParams.get('code');
    const apiUrl = 'http://localhost:5500/api/v1/droopie/sync';
    Toast.fire({
      icon: 'info',
      title: 'Dropbox is syncing please wait...'
    })
    try {
      const syncRes = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: userGivenCode,
        })
      });

      const syncData = await syncRes.json();
      const { error: syncErr, message } = syncData || {};
      if (syncErr) {
        Toast.fire({
          icon: 'error',
          title: message,
        })
      }
      else if (message) {
        Toast.fire({
          icon: 'success',
          title: message,
        })
      }
    } catch (error: any) {
      Toast.fire({
        icon: 'error',
        title: error.message || 'Something went wrong while syncing!'
      })
    }
  }

  useEffect(() => {
    if (error) {
      Toast.fire({
        icon: 'error',
        title: error
      })
    }
  }, [error])


  return (
    <div className="container" >
      <form onSubmit={handleSubmit} className="myDefaultForm" >
        <h4 className="myDefaultFormName" >Sync Dropbox account</h4>


        <div className="input-field myBtnsHolder center-align">
          <p>
            Click on the following button to sync your Dropbox account
          </p>
        </div>

        <div className="input-field myBtnsHolder center-align">
          <button type="submit" className="btn myBtn waves-effect waves-light" id="myDownloadBtn">
            <i className="fa fa-cogs"></i> Sync your account
          </button>

        </div>

      </form>
    </div>
  )
}

export default SyncPage;
