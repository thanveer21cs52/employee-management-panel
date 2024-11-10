import React from 'react'
import Nav from './Nav';
import Employee from './Employee';

function Home() {
  return (<>
  <Nav />
  <div className='pgname'>
      <p>Dashboard</p>
    </div>
  <div id="wl-page">
      <p>Welcome Admin Panel</p>
    </div>
  </>
  )
}

export default Home