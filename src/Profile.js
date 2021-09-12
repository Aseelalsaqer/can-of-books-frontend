import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  render() {
    const { user,isAuthenticated } = this.props.auth0;
    return(
        <>
        {isAuthenticated && 
        <>
            <div>Name: {user.name}</div>
            <div>Email : {user.email}</div>
        </>
       
        }
         {!isAuthenticated && <p>Please Enter Your Data</p>}
        </>
    )
    
    
  }
}

export default withAuth0(Profile);