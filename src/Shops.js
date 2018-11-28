import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import facade from './Facade';




function Tablerow(props) {




    const shops = props.shops


    const result = shops.map((shop) =>
        <tr key={shop.id}>
            <td>
                <div>
                    <Link to={`/butik/${shop.shopName}-${shop.id}`}>{shop.shopName}</Link>
                    <br />
                    <small>
                        {shop.shopAddress + ", " + shop.shopPostalCode}
                    </small>
                </div>
            </td>
        </tr>

    )
    return result;

}

function Nothinginthiscity(props) {
    
    const zipcode = props.zipbyen;
    console.log(zipcode)
    return (<div>
    </div>)
}


class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = { zipcode: '', zipbyen: '', shops: [], nothing: false };
    }

    componentDidMount = async () => {

        const props = this.props;
        const match = props.match;
        const values = match.params.zipcode; 
        const data = await facade.getZipcode(values);
        if (data !== 0) {
            const byen = data[0].navn;
            this.setState({ zipbyen: byen });

        }

        const shopfrompostical = await facade.getshopbyposticalcode(values);
        if (shopfrompostical === undefined || shopfrompostical.length !== 0) {
            this.setState({ shops: shopfrompostical, nothing: false });
        } else {


            this.setState({ nothing: true })
        }
    }



    render() {
        if (this.state.nothing) {
            return (
                <div>
                    <div className="container">
                        <h2>
                            {this.state.zipbyen}
                        </h2>
                    </div>
                    <div className="container">
                        <div>
                            Der er intet i denne by prøve en anden
                            <Nothinginthiscity zipbyen={this.state.zipbyen} />
                        </div>
                    </div>
                </div>
            )
        }
        return (<div>
            <div className="container">
                <h2>
                    {this.state.zipbyen}
                </h2>
            </div>
            <div className="container">
                <table className="table" >
                    <tbody>
                        <Tablerow shops={this.state.shops} />
                    </tbody>
                </table>
            </div>
        </div>)

    }
}

export default Shop;