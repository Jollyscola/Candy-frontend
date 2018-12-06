import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Candy from './Candy';
import './Color.css';





class Product extends Component {

    constructor(props) {

        super(props)
        this.state = { zipcode: [], isload: false, pris: {}, candys: [], shop: '', id: '' };


    }

    onChange = (props) => {
        const onChage = props;
        console.log(onChage);
    }


    async  componentDidMount() {
        const props = this.props;
        const match = props.match;
        const shop = match.params.shops;
        const id = match.params.id;
        this.setState({ shop, id })

        const candys = await this.props.facade.findallcandybyid();
        this.setState({ candys })
    }


    



    render() {
        /* console.log(this.props.shoppingCart.amount.length); */
        return (
            <div className="container">
                <div className="text-center">
                    <h3>{this.state.shop}</h3>
                </div>
                <div className="container">
                    <Link to={`/reviews/${this.state.shop}-${this.state.id}`}>Reviews</Link>
                </div>
                <div className="container">
                    <h4>Kategori</h4>
                </div>
                <div>
                    <Candy candys={this.state.candys} addToShoppingCart={this.props.addToShoppingCart} handleClick={this.handleClick} />
                    <div className="text-center" >
                        <Link to="/shoppingcart"><i className="fas fa-cart-arrow-down big-icon" /></Link>
                    </div>
                </div>
                <br/><br/>
            </div>

        )
    }
}
export default Product;
