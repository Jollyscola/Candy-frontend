import React, { Component } from "react"
import LoggedIn from "./LoggedIn";


class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { email: "", password: "" }
    }
    login = (evt) => {
      evt.preventDefault();
      this.props.login(this.state.email, this.state.password);
    }
    errormessenge = () => {
      console.log("Login error")
    }
    onChange = (evt) => {
      this.setState({ [evt.target.id]: evt.target.value })
    }
    render() {
      return (
        <div className="text-center">
          <div>
            <h2>Login</h2>
            <form onSubmit={this.login} onChange={this.onChange} >
              <input placeholder="E-mail" id="email" type="email" />
              <input placeholder="Password" id="password" type="password" />
              <button>Login</button>

            </form>
          </div>
        </div>
      )
    }
  }

  class AuthenticationStatus extends Component {
  
    render() {
      return (
        <div>
          {!this.props.loggedIn ? (
            <Login login={this.props.login} />) :
            (<div className="text-center">
              <LoggedIn loggedIn={this.props.loggedIn}  />
              
            </div>)}
        </div>
      )
    }
  }
  export default AuthenticationStatus;
  
