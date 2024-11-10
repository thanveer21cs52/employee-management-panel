import React from 'react'
import Nav from './Nav';
import Employee from './Employee';

function List() {
  return (
    <div>
        <Nav />
        <div className='pgname'>
      <p>Employee list</p>
    </div>
        <Employee />
    </div>
  )
}

export default List