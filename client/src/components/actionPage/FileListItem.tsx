import React from 'react'
import moment from 'moment';
interface propsInterface {
  item: any
}



function FileListItem(props: propsInterface) {
  const { item } = props;
  return (
    <li>
      <div>
        <div className="myUserName">
          <a href={item.url}>
            {item.file_name}
          </a>
        </div>

        <p className="grey-text">
          {moment(item.dropbox_updated_at).format('YYYY-MM-DD HH:MM')}
        </p>
      </div>
    </li>
  )
}

export default FileListItem;
