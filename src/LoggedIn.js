import React, { Component } from "react"
import facade from "./Facade";

class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!", people: [], DataEmail: "" };
  }
  componentDidMount = async () => {
    facade.fetchDataEmail().then(res => this.setState({ dataFromServer: res }));
    facade.fetchDataAdmin().then(res => this.setState({ dataFromServer: res }));
  }
  render() {

    return (
      <div >

        <div className="text-center">
          <br />
          <h4>{this.state.dataFromServer}</h4>
          <div>
            {facade.firstName} - {facade.lastName}
          </div>
          <div>
            {facade.city}
          </div>
          <div>
            {facade.address} - {facade.zip}
          </div>
        </div>
      </div>
    )
  }
}
export default LoggedIn;