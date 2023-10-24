import React, { children } from 'react'


const Layout=({children})=> {
  return (
    <React.Fragment>
     
        
        <main>{children}</main>
       
    </React.Fragment>
  )
}

export default Layout



