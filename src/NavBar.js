
import React, { Component } from "react"
import { HashRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import facade from "./Facade";
import Home from "./Home";
import Product from "./Product";
import Shops from "./Shops";
function Header(props) {
    //const header = props;
    return (<div>
        <ul>
            <li className="nav-item active" ><NavLink exact className="nav-link" to="/">Home</NavLink></li>
        
        </ul>
    </div>
    )
}

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = { loggedIn: false }
    }

    logout = () => {
        facade.logout();
        this.setState({ loggedIn: false });
    }

    login = (user, pass) => {
        facade.login(user, pass)
            .then(res => this.setState({ loggedIn: true }));
    }

    render() {

        return (
            <Router>
                <div>
                    <Header loggedIn={this.state.loggedIn} />
                    <Switch>
                        <Route exact path="/" render={() => <Home />} />
                        <Route path="/area/:zipcode" component={Shops} />
                        <Route path="/:shops" component={Product} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default NavBar;