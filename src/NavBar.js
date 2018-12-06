import React, { Component } from "react"
import './Color.css';
import { NavLink, Link } from 'react-router-dom';
class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = { result: '' }
    }

    shopningcartamount(shoppingCart) {

        if (shoppingCart.length > 0) {
            var total = 0;

            if (shoppingCart.length === 1) {
                return shoppingCart[0].amount;
            }


            if (shoppingCart.length > 1) {
                for (var i in shoppingCart) { total += shoppingCart[i].amount; }

            }
            return total;

        }
    }
    render() {
        return (<div>
            <nav className="navbar navbar-expand-lg navbar-light nav-BarColor" >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active" ><NavLink exact className="nav-link" to="/">Home</NavLink></li>
                    <li className="nav-item" ><NavLink exact className="nav-link" to="/shoplist">All shops</NavLink></li>


                </ul>
                <ul className="navbar-nav navbar-right">
                    {!this.props.loggedIn ? (<li className="nav-item" ><NavLink exact className="nav-link" to="/login">login</NavLink></li>) :
                        (this.props.loggedIn && <li className="nav-item" ><NavLink exact className="nav-link" to="/edit">Edit</NavLink></li>)}
                    {!this.props.loggedIn && <li className="nav-item" ><NavLink exact className="nav-link" to="/register">Register</NavLink></li>}
                    {this.props.loggedIn && <div className="col-xs-6 col-md-3">
                        <button className="btn btn-primary" onClick={this.props.logout}>Logout</button>

                    </div>}
                </ul>
                <Link to="/shoppingcart">
                <div className="p-3 mb-2 bg-primary text-white ">

                    vægt i gram {this.props.shoppingCart.length > 0 && this.shopningcartamount(this.props.shoppingCart) /* ? this.props.shoppingCart === 0 && this.props.shoppingCart: 0 */}  <i className="fas fa-cart-arrow-down" />

                </div>
                </Link>
            </nav>
        </div>
        )
    }
}






export default NavBar;
