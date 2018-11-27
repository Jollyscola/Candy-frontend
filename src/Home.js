import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';
import facade from './Facade';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = { redirect: false, zipcode: '', error: '' };
  }



  getZipcode = async (event) => {

   
    event.preventDefault();
    const values = event.target.zipcode.value;
    if (values > 9999 || 1000 > values ) {
      const errormessenge = 'Du skal kun skrive 4 cifre for at søg på postnummer';
      this.setState({ error: errormessenge});
    } else {
      const zipcode = await facade.getZipcode(values);
      const zip = zipcode[0].nr;
      this.setState({ zipcode: zip, redirect: true });
    } 
  }



  render() {
    if (this.state.redirect) {
      return <Redirect to={`/area/${this.state.zipcode}`} />
    } else {
      return (
        <div className="App"  >
          <form onSubmit={this.getZipcode}>
            <input type="number" name="zipcode" placeholder="Postnummer" onChange={this.handleChange} />
            <input type="submit" value="Silk Butikker" />
      
          </form>
          <small>{this.state.error}</small>
        </div>

      );
    }
  }
}

export default Home;
