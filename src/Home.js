import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';
import facade from './Facade';
import Background from './image/background.jpg';
import './Color.css'

var sectionStyle = {
  width: "100%",
  height: "600px",
  backgroundImage: `url(${Background})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};




class Home extends Component {

  constructor(props) {
    super(props)
    this.state = { redirect: false, zipcode: '', error: '' };
  }



  getZipcode = async (event) => {


    event.preventDefault();
    const values = event.target.zipcode.value;
    if (values > 3699 || 1000 > values) {
      const errormessenge = 'Du skal kun skrive 4 cifre for at søg på postnummer';
      this.setState({ error: errormessenge });
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
          <section style={sectionStyle}>
            <br />
            <h3 className="text-white font-weight-bold"> Velkommen silkmig.nu</h3>
            <br />
            <h4 className="text-white">Bestil dit take away slik online</h4>
            <form onSubmit={this.getZipcode}>
              
                <div className="row justify-content-md-center">
                 
                    <input type="number" name="zipcode" placeholder="Postnummer" className="col-xs-2" onChange={this.handleChange} />
                  
                    <span className="input-group-btn">
                    <input type="submit" value="Silk Butikker" className="btn btn-primary" />
                 </span>
              </div>

            </form>

            <small>{this.state.error}</small>

          </section>
        </div>

      );
    }
  }
}

export default Home;
