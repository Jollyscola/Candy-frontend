import React, { Component } from 'react';
import facade from './Facade';


function HeaderTableProduct() {
    return (
        <tr>
            <th>
                Navn
            </th>
            <th>
                Vægt
            </th>
        </tr>
    )

}

/* function findProductIndex(cards, id) {
    return cards.findIndex((p) => p.id === id)
} */




// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) {
        alert("1")
        return true;
    }

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) {
        alert("2")
        return false;
    }
    if (obj.length === 0) {
        alert("3")
        return true;
    }

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") {
        alert("4")
        return true;
    }
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            alert("5")
            return false;
        }
    }

    return true;
}
class Candy extends Component {



    constructor(props) {
        super(props)
        this.state = { candys: [], shopcart: [], isload: false, candy: {}, candyid: { id: '', amount: '', name: '' } }
    }
    onSubmit = (event) => {
        event.preventDefault();
        //const p[] = this.state.amount;
        const candyid = this.state.candyid
        alert(JSON.stringify(candyid));
        console.log("submit", candyid);
        const id = candyid.id;
        const pris = candyid.amount;
        const name = candyid.name;
        var shopcart = this.state.shopcart;
        shopcart.push({ id, pris, name })
        console.log("shopcart", shopcart[0], shopcart[1])
        //const candyobject = this.state.candyid;
        //hiv candy og id ud "uni candy"
        //set.setstate id candy og antal 
        // og en slags condit 
        // obej   
    }


    /*  shouldComponentUpdate(nextState) {
         if (this.state.someValue !== nextState.someValue) {
             return;
         }
     } */

    handleChange = (event) => {
        const id = Number(event.target.id)
        const amountnumber = Number(event.target.value);
        console.log("amountnumber: ", amountnumber)
        //const amount = this.state.amount;
        const candyid = this.state.candyid;
        console.log("candy", this.state.candys[id - 1]);
        candyid.name = this.state.candys[id - 1].candyName;
        candyid.amount = amountnumber;
        id === candyid.id && (candyid.amount = event.target.value)
        const amount = candyid.amount;
        const name = candyid.name;
        console.log("candyid", candyid);
        this.setState({ candyid: { id, amount, name } });
        //event.target.value = "";
    }
    async  componentDidMount() {
        const candys = await facade.findallcandybyid();
        this.setState({ candys })
        /* const all = this.props.candys;
        this.setState({ candys: all }); */
    }

    render() {
        // const allcandy = this.state.candys;
        return (<div>

            {this.state.candys.map(candy =>
                <tr key={candy.id}>
                    <td>
                        {candy.candyName}
                    </td>
                    <td>
                        <form onSubmit={this.onSubmit} id={candy.id}>
                            <input type="number" id={candy.id} className="candy" name="candy" min="0" onChange={this.handleChange} value={candy.id[this.state.candyid.amount]} />
                            <input type="submit" id={candy.id} className="addtocart" value="Add to cart" />


                        </form >
                    </td>
                </tr>
            )}
            <div>
                {this.state.isload && this.state.shopcart[0].pris + "-" + this.state.shopcart[0].name + "-"}
                {/*remove me*/ JSON.stringify(this.state.candyid)}
            </div>
        </div>
        )

    }
    // <input type="text" name="submit" readOnly onChange={this.onChange} />




}



class Procduct extends Component {

    constructor(props) {
        super(props)
        this.state = { zipcode: [], isload: false, pris: {} };
    }

    onChange = (props) => {
        const onChage = props;
        console.log(onChage);
    }



    render() {
        return (
            <div className="container">
                <div className="text-center">



                </div>
                <div className="container">
                    <h4>Kategori</h4>
                    <table className="Table">
                        <thead><HeaderTableProduct /></thead>
                        <tbody><Candy candys={this.state.candys} /></tbody>
                    </table>
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Procduct;
