import React, { Component } from "react"
import facade from "./Facade";

class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!", people: [] };
  }
  componentDidMount = async () => {
    facade.fetchDataEmail().then(res => this.setState({ dataFromServer: res }));
    facade.fetchDataAdmin().then(res => this.setState({ dataFromServer: res }));

  }
  render() {
    return (
      <div >
        <div className="text-center">
        <br/>
        <h2>{this.state.dataFromServer}</h2>
        </div>
      </div>
    )
  }
}
export default LoggedIn;