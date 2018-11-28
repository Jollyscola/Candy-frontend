import React, { Component } from "react"

class ShoppingCart extends Component {


    constructor(props) {
        super(props)
        this.state = {}
    }

    candyTable() {
        return (
            this.props.shoppingCart.map((product) =>
                <tr>
                    <td>
                        {product.name}
                        {/* JSON.stringify(product) */}
                    </td>
                    <td>
                        {product.amount}
                    </td>
                </tr>)
        )
    }

    render() {

        return (
            <div className="column">
                <table className="table">
                    {this.candyTable()}
                </table>
                <div>
                {/* <input type="submit"  /> */}
                </div>
            </div>
        )
    }
}

export default ShoppingCart;
