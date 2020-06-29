import React from 'react';
import {Link} from 'react-router-dom';

function Sidebar() {
  return (
    
      <Link to="/client/add" className="btn btn-primary btn-block">
        <i className="fa fa-plus"/> New Client
      </Link>
    
  )
}

export default Sidebar
