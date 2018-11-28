
import React, { Component } from "react"
import NavBar from "./Navbar";
import facade from "./Facade";



class App extends Component {

    
    render() {

        return <NavBar facade={facade}/>
    }
}

export default App;



