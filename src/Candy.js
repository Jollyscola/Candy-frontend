
import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
function HeaderTableProduct() {
    return (
        <tr>
            <th>
                info
            </th>
            <th>
                Navn
            </th>
            <th>
                Vægt i gram 
            </th>
        </tr>
    )

}







class Candy extends Component {

    constructor(props) {
        super(props)
        this.state = { isload: false, message: null, todosPerPage: 6, currentPage: 1, show: false, popoverOpen: false };
        this.handleClick = this.handleClick.bind(this);

        this.toggle = this.toggle.bind(this);
    }

    onShopcard = (event) => {
        event.preventDefault();
        const id = event.target.id.value;
        const name = event.target.name.value;
        const type = event.target.type.value;
        const flavour = event.target.flavour.value;
        const amount = Number(event.target.amount.value);
        console.log(id, name, amount)
        this.props.addToShoppingCart(id, name, amount,type,flavour);
        this.setState({ message: 'Added product: ' + name + ' (Vægt: ' + amount + ')' })
        event.target.reset();
    }


    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ message: null })
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }




    render() {
        const { currentPage } = this.state;
        const { todosPerPage } = this.state;

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = this.props.candys.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderCandy = currentTodos.map((candy) => {
            return (
                <tr key={candy.id}>
                    <td>
                        <PopoverItem candy={candy} />
                    </td>
                    <td>
                        {candy.name}
                    </td>
                    <td>
                        <form onSubmit={this.onShopcard} onFocus={this.props.handleChange}>
                            <input type="hidden" name="id" value={candy.id} />
                            
                            <input type="hidden" name="name" value={candy.name} />
                            <input type="hidden" name="type" value={candy.type} />
                            <input type="hidden" name="flavour" value={candy.flavour} />
                            <input type="number" id="amount" className="candy" min="0" />
                            <input type="submit" className="addtocart" value="Add to cart" />
                        </form >
                    </td>
                </tr>

            )
        });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.candys.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li key={number} id={number} onClick={this.handleClick} className="page-link">
                    {number}
                </li>
            );
        });



        return (



            <div>
                 <table className="table" id="myTable">

                    <thead>
                        {HeaderTableProduct()}
                    </thead>
                    <tbody id="myTable">
                        {renderCandy}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul id="page-numbers" className="pagination">
                        {renderPageNumbers}
                    </ul>
                </nav>
            </div >
        );

    }

}


class PopoverItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            candy: props.candy,
            popoverOpen: false
        };
    }

    toggle = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        return (
            <span>
                <i className="fas fa-info" id={`Popover-${this.state.candy.id}`} onMouseOver={this.toggle} onMouseOut={this.toggle}></i>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target={`Popover-${this.state.candy.id}`} toggle={this.toggle}>
                    <PopoverHeader>{this.state.candy.name}</PopoverHeader>
                    <PopoverBody>flavour: {this.state.candy.flavour}</PopoverBody>
                    <PopoverBody>Type: {this.state.candy.type}</PopoverBody>
                    
                </Popover>
            </span>
        );
    }
}

export default Candy