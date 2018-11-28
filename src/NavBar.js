import React, { Component } from "react"
import { HashRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Product from "./Product";
import Shops from "./Shops";
import ShoppingCart from "./ShoppingCart";
import Shoplist from "./Shoplist";
import Reviews from "./Reviews";
function Header(props) {
    //const header = props;
    return (<div>
        <ul>
            <li className="nav-item active" ><NavLink exact className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item active" ><NavLink exact className="nav-link" to="/shoplist">All shops</NavLink></li>


        </ul>
    </div>
    )
}

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = { loggedIn: false, shoppingCart: [] }
    }

    logout = () => {
        this.props.facade.logout();
        this.setState({ loggedIn: false });
    }

    login = (user, pass) => {
        this.props.facade.login(user, pass)
            .then(res => this.setState({ loggedIn: true }));
    }

    addToShoppingCart = (id, name, amount) => {
        const shoppingCart = this.state.shoppingCart;

        let foundProduct = false;
        foundProduct = shoppingCart.find((product, index) => {
            if (product.id === id) {
                shoppingCart[index].amount += amount;
                return true;
            }
            return false;
        });
        if (!foundProduct) {
            shoppingCart.push({ id, name, amount });
        }

        this.setState({ shoppingCart })
    }
    
    render() {

        return (
            <div>
                <Router>
                    <div>
                        <Header loggedIn={this.state.loggedIn} />
                        <Switch>
                            <Route exact path="/" render={() => <Home />} />
                            <Route path="/area/:zipcode" component={Shops} />
                            <Route path="/butik/:shops-:id" render={(props) => <Product facade={this.props.facade} addToShoppingCart={this.addToShoppingCart} {...props} />} />
                            <Route path="/shoppingcart" render={(props) => <ShoppingCart shoppingCart={this.state.shoppingCart} {...props} />} />
                            <Route path="/shoplist" render={(props) => <Shoplist facade={this.props.facade} {...props} />} />
                            <Route path="/reviews/:shop-:id" render={(props) => <Reviews facade={this.props.facade} {...props} />} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default NavBar;
