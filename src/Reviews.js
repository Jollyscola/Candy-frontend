import React, { Component } from "react"


class Reviews extends Component {


    constructor(props) {
        super(props)
        this.state = { store: '', Review: {}, shop: { id: '' }, shopreviews: [] }
    }

    async componentDidMount() {


        const match = this.props.match;
        const store = match.params.shop;
        const id = match.params.id;
        const shopreviews = await this.props.facade.getreviewbyid(id);
        console.log("shop:", shopreviews);
        this.setState({ store, shop: { id }, shopreviews })

        
      
    }

    handleChange = (event) => {
        const id = event.target.id;
        const review = this.state.Review
        const shop = this.state.shop;

        id === 'rating' && (review.rating = event.target.value);
        id === 'review' && (review.review = event.target.value);
        review.shop = shop;

        this.setState({ Review: review });
    }

    submitReview = (event) => {
        event.preventDefault();
        const reviews = this.state.Review;

        this.props.facade.addReview(reviews);
        event.target.reset();


    }
    reviewtable = () => {

        console.log("shopreview:", this.state.shopreviews)
        const result = this.state.shopreviews.map(product =>
            <tr key={product.id}>
                <td>
                    Review ({product.review})
                    <br />
                    Rate: ({product.rating})
                </td>
            </tr>
        )
        return result;

    }
    render() {


        const store = this.state.store;
        return (
            <div >
                <div className="text-center">
                    <h3>Shopname: {store}</h3>
                </div>
                <div className="text-center">
                    <form onSubmit={this.submitReview} method="post">
                        <textarea onChange={this.handleChange} name="review" id="review" placeholder="Review" />
                        <br />
                        <input type="number" min="1" max="5" id="rating" onChange={this.handleChange} placeholder="Rate 1-5" />
                        <input type="submit" value="Review" />
                    </form>
                </div>
                <div className="container">
                    <table  className="table">
                        <tbody>{this.reviewtable()}</tbody>
                    </table>
                </div>
            </div>

        )

    }


}

export default Reviews;