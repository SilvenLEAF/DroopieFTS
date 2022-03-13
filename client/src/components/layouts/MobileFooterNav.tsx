import '../../styles/footer/MobileFooterNav.scss'

import React from 'react'
import MobileFooterLinks from './footerNavLinks/MobileFooterLinks'


function MobileFooterNav() {

  const link = MobileFooterLinks;
  return (
    <div id="myMobileFooterNav" className="container hide-on-large-only">
      { link }
    </div>
  )
}

export default MobileFooterNav
