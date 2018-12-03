import React, { Component } from "react"
import './Color.css';
import { NavLink } from 'react-router-dom';
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

            <nav className="navbar navbar-expand-lg navbar-dark nav-BarColor" >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active" ><NavLink exact className="nav-link" to="/">Home</NavLink></li>
                    <li className="nav-item" ><NavLink exact className="nav-link" to="/shoplist">All shops</NavLink></li>
                    {!this.props.loggedIn && <li className="nav-item" ><NavLink exact className="nav-link" to="/login">login</NavLink></li>}
                    {!this.props.loggedIn && <li className="nav-item" ><NavLink exact className="nav-link" to="/register">Register</NavLink></li>}


                </ul>
                <div className="p-3 mb-2 bg-primary text-white ">
                    vægt i gram {this.props.shoppingCart.length > 0 && this.shopningcartamount(this.props.shoppingCart) /* ? this.props.shoppingCart === 0 && this.props.shoppingCart: 0 */} <i className="fas fa-cart-arrow-down" />

                </div>
            </nav>
        </div>
        )
    }
}






export default NavBar;
