import endpoints from './settings.js';
import shareendpoints from './sharesettings.js';

var jwtDecode = require('jwt-decode');
const URL = endpoints
const shareURL = shareendpoints



function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}



class Facade {


    constructor() {
        this.email = null;
        this.firstName = null;
        this.lastName = null;
        this.phone = null;
        this.address = null;
        this.city = null;
        this.zip = null;
    }
    makeOptions(method, addToken, body) {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && this.loggedIn()) {
            opts.headers["x-access-token"] = this.getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }



        return opts;
    }



    makeOptionswithoutToken(method, body) {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }



        return opts;
    }


    setToken = (token) => {
        console.log("without:", token);
        var decode = jwtDecode(token);
        console.log("with", decode);
        this.city = decode.city;
        this.email = decode.email;
        this.firstName = decode.firstName;
        this.lastName = decode.lastName;
        this.address = decode.address;
        this.zip = decode.zip;
        this.phone = decode.phone;
        
        localStorage.setItem('jwtToken', token)
    }
    getToken = () => {
        return localStorage.getItem('jwtToken')
    }
    loggedIn = () => {
        const loggedIn = this.getToken() != null;
        return loggedIn;
    }
    logout = () => {
        localStorage.removeItem('jwtToken');
    }

    login = async (email, pass) => {
        const options = this.makeOptions("POST", true, { email: email, password: pass });
        console.log("facade email: ", email)
        console.log("facade Password: ", pass)
        return fetch(URL + "/api/login", options, true)
            .then(handleHttpErrors)
            .then(res => { this.setToken(res.token) })
          
    }


    fetchDataEmail = async () => {
        const options = this.makeOptions("GET", true);
        return await fetch(URL + "/api/info/user", options).then(handleHttpErrors);
    }


    fetchDataAdmin = async () => {
        const options = this.makeOptions("GET", true);

        return await fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
    }

    createUser = async (body) => {
        console.log("facade", body)
        const options = this.makeOptions("POST", true, body);
        return await fetch(URL + "/api/register", options).then(handleHttpErrors)
            .then(res => { this.setToken(res.token) });
    }
    editUser = async (body, value) => {
        console.log("facade", body)
        const options = this.makeOptions("PUT", true, body);
        return await fetch(URL + "/api/register/" + value, options).then(handleHttpErrors)
            .then(res => { this.setToken(res.token) });
    }

    getZipcode = async (value) => {
        const zipcode = value;
        return fetch("http://dawa.aws.dk/postnumre/?nr=" + zipcode).then(handleHttpErrors);
    }
    findcandybyid = async (values) => {
        const id = values;
        const options = this.makeOptionswithoutToken("GET");
        return fetch(shareURL + "/" + id, options).then(handleHttpErrors);
    }

    findallcandybyid = async () => {
        const options = this.makeOptionswithoutToken("GET");
        return fetch(shareURL, options).then(handleHttpErrors);
    }
    findallshopbyid = async () => {
        const options = this.makeOptionswithoutToken("GET");
        return fetch(URL + "/api/shop/allshop", options).then(handleHttpErrors);
    }



    getshopbyposticalcode = async (value) => {
        const posticalcode = value;
        const options = this.makeOptionswithoutToken("GET");
        return fetch(URL + "/api/shop/shoppostalcode/" + posticalcode, options).then(handleHttpErrors);

    }
    async addReview(body) {
        console.log(body);
        return await fetch(URL + "/api/review", this.makeOptionswithoutToken("POST", body)).then(handleHttpErrors)
    }
    getshopbyid = async (value) => {
        const id = value;
        const options = this.makeOptionswithoutToken("GET");
        return fetch(URL + "/api/shop/" + id, options).then(handleHttpErrors);
    }

    getreviewbyid = async (value) => {
        const id = value;
        console.log("id", id)
        const options = this.makeOptionswithoutToken("GET");
        return fetch(URL + "/api/review/" + id, options).then(handleHttpErrors);
    }

}

const facade = new Facade();

export default facade;