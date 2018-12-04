import React, { Component } from "react"
import facade from "./Facade";

class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { people: [] };
  }
  componentDidMount = async () => {
   
    //facade.fetchDataAdmin().then(res => this.setState({ dataFromServer: res }));

  }

  render() {
    console.log(this.props)
    return (
      <div >
        <div className="text-center">
          <br />
          <h2>{this.props.dataFromServer}</h2>
        </div>
      </div>
    )
  }
}
export default LoggedIn;