import React, { Component } from 'react';
import facade from './Facade';


class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = { userprofil: {} }
    }


    componentDidMount() {

    }


    handleChange = (event) => {
        const id = event.target.id;

        var userprofil = this.props.facade;
        console.log(userprofil.email)
        id === 'firstName' && (userprofil.firstName = event.target.value);
        id === 'lastName' && (userprofil.lastName = event.target.value);
        id === 'email' && (userprofil.email = event.target.value);
        id === 'password' && (userprofil.password = event.target.value);
        id === 'phone' && (userprofil.phone = event.target.value);
        id === 'city' && (userprofil.city = event.target.value);
        id === 'address' && (userprofil.address = event.target.value);
        id === 'zip' && (userprofil.zip = Number(event.target.value));

        this.setState({ userprofil: userprofil });
    }

    EditUser = (event) => {
        event.preventDefault();
        const user = this.state.userprofil;
        console.log(user);
        facade.editUser(user, user.email)
        event.target.reset();
        this.setState({userprofil: {firstName : '' , lastName: '', email: '', password: '', phone: '', city: '', address:'', zip: ''}})

    }
    render() {
        var userprofil = this.props.facade;
      /*   if (!this.props.loggedIn) { */
            return (
                <div className="text-center">
                    <div>

                        {this.state.dataFromServer}
                        <h2>Edit</h2>
                        <form onSubmit={this.EditUser} method="Put" >
                            <input onChange={this.handleChange} value={userprofil.firstName} placeholder="FirstName" id="firstName" required /><br />
                            <input onChange={this.handleChange} value={userprofil.lastName} placeholder="lastName" id="lastName" required /><br />
                            <input onChange={this.handleChange} value={userprofil.phone} placeholder="phone" id="phone" type="tel" required /><br />
                            <input onChange={this.handleChange} value={userprofil.city} placeholder="city" id="city" type="city" required /><br />
                            <input onChange={this.handleChange} value={userprofil.address} placeholder="address" id="address" type="address" required /><br />
                            <input onChange={this.handleChange} value={userprofil.zip} placeholder="zip" id="zip" type="number" min="1111" max="9999" required /><br />
                            <input onChange={this.handleChange} placeholder="password" id="password" type="password" required /><br />
                            <input type="submit" value="Edit" /><br />
                        </form>
                    </div>
                </div>
            

           
        )/* } else{ 
        return(
            <div>Hej</div>
        ) */
        /*  } */
    }
}

export default Edit;