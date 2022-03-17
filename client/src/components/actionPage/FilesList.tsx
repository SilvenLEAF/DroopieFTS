import M from 'materialize-css'
import '../../styles/ActionPage.scss';
import '../../styles/Form.scss';
import '../../styles/profile/FileList.scss'

import React, { useEffect, useState } from 'react'

import { Toast } from '../../helpers/MyAlerts';
import FileListItem from './FileListItem';



function FilesList() {
  useEffect(() => {
    M.AutoInit();
  }, []);


  const [keywords, setKeywords] = useState('');
  const [mustHaveKeywords, setMustHaveKeywords] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [sort, setSort] = useState('file_name:asc');

  const [error, setError] = useState('');
  const [records, setRecords] = useState([]);
  const [apiRes, setApiRes] = useState<any>({});

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    let apiUrl = `http://localhost:5500/api/v1/droopie/files?searchKey=${searchKey || ''}&sort=${sort || ''}`;
    if (keywords) {
      const keywordsArr = keywords.split(',');
      for (let item of keywordsArr) {
        apiUrl += `&keywords=${item}`;
      }
    }
    if (mustHaveKeywords) {
      const mustHaveKeywordsArr = mustHaveKeywords.split(',');
      for (let item of mustHaveKeywordsArr) {
        apiUrl += `&mustHaveKeywords=${item}`;
      }
    }

    try {
      const response = await fetch(apiUrl);
      const listData = await response.json();
      const { error: syncErr, message, records: resRecords = [] } = listData || {};
      if (syncErr) {
        Toast.fire({
          icon: 'error',
          title: message,
        })
      }
      else {
        setApiRes(listData);
        setRecords(resRecords);
        Toast.fire({
          icon: 'success',
          title: 'Successfully retrieved the files',
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
    <div className="container myFileListPage" >
      <form onSubmit={handleSubmit} className="myDefaultForm" >
        <h4 className="myDefaultFormName" >Files List (FTS)</h4>

        <div className="myInputHolder">
          <p>Keywords <span className="red-text">(comma seperated)</span></p>
          <div>
            <i className="myPrefix far fa-address-card"></i>
            <input type="text" name="contactTitle" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder='FTS "OR" Search' />
          </div>
        </div>

        <div className="myInputHolder">
          <p>Must Have Keywords <span className="red-text">(comma seperated)</span></p>
          <div>
            <i className="myPrefix far fa-address-card"></i>
            <input type="text" name="contactTitle" value={mustHaveKeywords} onChange={e => setMustHaveKeywords(e.target.value)} placeholder='FTS "AND" Search' />
          </div>
        </div>

        <div className="myInputHolder">
          <p>Search Key <span className="red-text">(on file names)</span></p>
          <div>
            <i className="myPrefix far fa-address-card"></i>
            <input type="text" name="contactTitle" value={searchKey} onChange={e => setSearchKey(e.target.value)} placeholder='Normal Search' />
          </div>
        </div>

        <div className="myInputHolder">
          <p>Sort <span className="red-text">(colon seperated)</span></p>
          <select value={sort} onChange={e => setSort(e.target.value)} >
            <option value="file_name:asc" >Name ASC</option>
            <option value="file_name:desc" >Name DESC</option>
            <option value="dropbox_updated_at:asc" >Updated ASC</option>
            <option value="dropbox_updated_at:desc" >Updated DESC</option>
          </select>
          <label>Materialize Select</label>
        </div>


        <div className="input-field myBtnsHolder right-align">
          <button type="submit" className="btn myBtn waves-effect waves-light" id="myDownloadBtn">
            <i className="fa fa-cogs"></i> Sumbit
          </button>

          <button onClick={() => {
            setKeywords('');
            setMustHaveKeywords('');
            setSearchKey('');
            setSort('file_name:asc');
          }} className="btn mySecondaryBtn waves-effect waves-light" id="myDownloadBtn">
            <i className="fa fa-eraser"></i> Clear
          </button>
        </div>


      </form>

      <div className='center' style={{ marginBottom: '50px' }}>
        <p className='center'>Total matches {apiRes.count || 0}. Retrieved: {records.length}. Limit {apiRes.limit || 0}. Skipped: {(apiRes.offset || apiRes.offset == 0) ? apiRes.offset : 0}</p>
        {
          records.length ? records.map(item => <FileListItem item={item} />) : ''
        }
      </div>
    </div>
  )
}

export default FilesList;