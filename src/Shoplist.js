import React, { Component } from "react"
import { Link } from 'react-router-dom';

class Shoplist extends Component {


    constructor(props) {
        super(props)
        this.state = { getallshops: [] };

    }

    shophead = () => {

        return (
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>PostalCode</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
        )
    }

    shoptable = () => {
        const result = this.state.getallshops.map(shop =>
            <tr key={shop.id}>
                <td> <Link to={`/butik/${shop.shopName}-${shop.id}`}>{shop.shopName}</Link></td>
                <td>{shop.shopAddress}</td>
                <td>{shop.shopPostalCode}</td>
                <td>{shop.email}</td>
                <td>{shop.phone}</td>
            </tr>
        )
        return result
    }

    componentDidMount = async () => {
        const shops = await this.props.facade.findallshopbyid();
        console.log(shops);
        this.setState({ getallshops: shops });
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        {this.shophead()}
                    </thead>
                    <tbody>
                        {this.shoptable()}
                    </tbody>
                </table>
            </div>

        )
    }

}

export default Shoplist;
