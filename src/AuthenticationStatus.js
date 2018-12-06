import React, { Component } from "react"
import Login from './Login'
import LoggedIn from "./LoggedIn";

class AuthenticationStatus extends Component {

    render() {
      return (
        <div>
          {!this.props.loggedIn ? (
            <Login login={this.props.login} />) :
            (<div className="text-center">
              <LoggedIn />
              <button onClick={this.props.logout}>Logout</button>
            </div>)}
        </div>
      )
    }
  }
  export default AuthenticationStatus;