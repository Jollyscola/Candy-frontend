
import React, { Component } from 'react';



/* function getCat(props) {
    let result = [];
    const{ candys } = props;
    for (let item in candys) {
        if (candys.hasOwnProperty(item)) {
            candys[item].forEach((candy) => {
                if (candy.Category == Candy.id) {
                    result.push(candy);
                }
            });
        }
    }

    console.log(result);
} */

//

class Candy extends Component {

    constructor(props) {
        super(props)
        this.state = { candys: [], isload: false, message: null };
    }

    onShopcard = (event) => {
        event.preventDefault();
        const id = event.target.id.value;
        const name = event.target.candy.value;
        const amount = Number(event.target.amount.value);
        console.log(id, name, amount)       
        this.props.addToShoppingCart(id, name, amount);
        this.setState({ message: 'Added product: ' + name + ' (Vægt: ' + amount + ')'})
        event.target.reset();
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ message: null })
    }

    render() {
        return (<div>

            {this.props.candys.map(candy =>
                <tr key={candy.id}>
                    <td>
                        {candy.candyName}
                    </td>
                    <td>
                        <form onSubmit={this.onShopcard} onFocus={this.handleChange}>
                            <input type="hidden" name="id" value={candy.id} />
                            <input type="hidden" name="candy" value={candy.candyName} />
                            <input type="number" id="amount" className="candy" min="0" />
                            <input type="submit" className="addtocart" value="Add to cart" />
                        </form >
                    </td>
                </tr>
            )}

            {this.state.message ? this.state.message : null}
        </div>
        )

    }

}

export default Candy