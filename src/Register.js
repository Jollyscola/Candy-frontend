import React, { Component } from 'react';
import facade from './Facade';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { user : {}  }
    }


    handleChange = (event) => {
        const id = event.target.id;
        const user = this.state.user;

        id === 'firstName' && (user.firstName = event.target.value);
        id === 'lastName' && (user.lastName = event.target.value);
        id === 'email' && (user.email = event.target.value);
        id === 'password' && (user.password = event.target.value);
        id === 'phone' && (user.phone = event.target.value);
        id === 'city' && (user.city = event.target.value);
        id === 'address' && (user.address = event.target.value);
        id === 'zip' && (user.zip = Number(event.target.value));

        this.setState({ user: user });
    }

    submitUser = (event) => {
        event.preventDefault();
       const user = this.state.user;
       console.log(user);
        facade.createUser(user)
        event.target.reset();


    }
    render() {
        return (
            <div className="text-center">
                <div>
                    <h2>Register</h2>
                    <form onSubmit={this.submitUser} method="post" >
                        <input onChange={this.handleChange} placeholder="FirstName" id="firstName" /><br/>
                        <input  onChange={this.handleChange}placeholder="lastName" id="lastName" /><br/>
                        <input  onChange={this.handleChange}placeholder="email" id="email" /><br/>
                        <input onChange={this.handleChange} placeholder="password" id="password" /><br/>
                        <input onChange={this.handleChange} placeholder="phone" id="phone" /><br/>
                        <input  onChange={this.handleChange}placeholder="city" id="city" /><br/>
                        <input  onChange={this.handleChange}placeholder="address" id="address" /><br/>
                        <input onChange={this.handleChange} placeholder="zip" id="zip" type="number" min="1111" max="9999" /><br/>
                        <input type="submit" value="Register" /><br/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;