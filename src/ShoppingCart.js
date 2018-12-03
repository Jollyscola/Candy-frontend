import React, { Component } from "react"

class ShoppingCart extends Component {


    constructor(props) {
        super(props)
        this.state = {}
    }

    candyhead() {
        return (
            <tr>
                    <td>
                    Name
                    </td>
                    <td>
                    Type
                    </td>
                        <td>
                    Flavour
                    </td>
                     <td>
                    Vægt i gram
                    </td>

            </tr>
        )

    }

    candyTable() {
        console.log(this.props.shoppingCart);
        return (

            this.props.shoppingCart.map((product) =>
                <tr key={product.id}>
                    <td>
                        {product.name}
                    </td>
                    <td>
                        {product.type}
                    </td>
                    <td>
                        {product.flavour}
                    </td>
                    <td>
                        {product.amount}
                    </td>
                    <td>

                    </td>
                </tr>)
        )
    }

    render() {

        return (
            <div className="column">
                <div className="text-center">
                    <br /><br />
                    <h3>Shoppingcart</h3>
                </div>
                <table className="table">
                    <thead>{this.candyhead()}</thead>
                    <tbody>
                        {this.candyTable()}
                    </tbody>
                </table>
                <div>
                </div>
            </div >
        )
    }
}

export default ShoppingCart;
