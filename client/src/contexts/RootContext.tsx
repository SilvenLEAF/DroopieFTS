import React from 'react'
import AllUserContextProvider from './subContexts/AllUserContext'
import AllTaskContextProvider from './subContexts/AllTaskContext'



interface propsInterface {
  children: React.ReactNode
}



function RootContext(props: propsInterface) {
  return (
    <>
      
      <AllUserContextProvider>
        <AllTaskContextProvider>
          
          { props.children }
          
        </AllTaskContextProvider>
      </AllUserContextProvider>
    
    </>
  )
}

export default RootContext
