import React, { Component } from "react"
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Header from "./Navbar";
import facade from "./Facade";
import Home from "./Home";
import Product from "./Product";
import Shops from "./Shops";
import ShoppingCart from "./ShoppingCart";
import Shoplist from "./Shoplist";
import Reviews from "./Reviews";
import Login from "./Login";
import Register from "./Register";
import Edit from "./Edit";
class App extends Component {


    constructor(props) {
        super(props);
        this.state = { loggedIn: false, shoppingCart: [] }
    }

    logout = () => {
        facade.logout();
        this.setState({ loggedIn: false });
    }

    login = (email, pass) => {
        facade.login(email, pass)
            .then(res => this.setState({ loggedIn: true }));
    }

    addToShoppingCart = (id, name, amount, type, flavour) => {
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
            shoppingCart.push({ id, name, amount, type, flavour });
        }

        this.setState({ shoppingCart })
    }
    


    render() {

        return (
            <div>
                <Router>
                    <div>
                        <Header facade={facade} loggedIn={this.state.loggedIn} shoppingCart={this.state.shoppingCart} />
                        <Switch>
                            <Route exact path="/" render={() => <Home />} />
                            <Route exact path="/login" render={() => <Login logout={this.logout} login={this.login} loggedIn={this.state.loggedIn} DataEmail={this.state.dataFromServer}/>} />
                            <Route path="/area/:zipcode" component={Shops} />
                            <Route path="/butik/:shops-:id" render={(props) => <Product facade={facade} shoppingCart={this.state.shoppingCart} addToShoppingCart={this.addToShoppingCart} {...props} />} />
                            <Route path="/shoppingcart" render={(props) => <ShoppingCart facade={facade} shoppingCart={this.state.shoppingCart} {...props} />} />
                            <Route path="/shoplist" render={(props) => <Shoplist facade={facade} {...props} />} />
                            <Route path="/register" render={(props) => <Register facade={facade} {...props} />} />
                            <Route path="/edit" render={(props) => <Edit facade={facade} {...props} />} />
                            <Route path="/reviews/:shop-:id" render={(props) => <Reviews facade={facade} {...props} />} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;








