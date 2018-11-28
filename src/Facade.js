import endpoints from './settings.js';
const URL = endpoints

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}



class Facade {


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

    login = (user, pass) => {
        const options = this.makeOptions("POST", true, { username: user, password: pass });
        return fetch(URL + "/api/login", options, true)
            .then(handleHttpErrors)
            .then(res => { this.setToken(res.token) })
    }


    fetchDataUser = () => {
        const options = this.makeOptions("GET", true);

        return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
    }
    fetchDataAdmin = () => {
        const options = this.makeOptions("GET", true);

        return fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
    }


    getZipcode = async (value) => {
        const zipcode = value;
        return fetch("http://dawa.aws.dk/postnumre/?nr=" + zipcode).then(handleHttpErrors);
    }

    findallcandybyid = async() => {
        const options = this.makeOptionswithoutToken("GET");
        return fetch(URL + "/api/candy/allcandy", options).then(handleHttpErrors);
    }
    findallshopbyid = async() => {
        const options = this.makeOptionswithoutToken("GET");
        return fetch(URL + "/api/shop/allshop", options).then(handleHttpErrors);
    }

   /*  getZipcode = async (value) => {
        const zipcode = value;

        return fetch(URL + zipcode).then(handleHttpErrors);
    } */

    getshopbyposticalcode = async(value) => {
        const posticalcode = value;
        const options = this.makeOptionswithoutToken("GET");
        return fetch(URL + "/api/shop/shoppostalcode/" + posticalcode, options).then(handleHttpErrors);

    }
    async addReview(body) {
        console.log(body);
        return await fetch(URL + "/api/review",this.makeOptionswithoutToken("POST", body)).then(handleHttpErrors)
    }
    getshopbyid = async(value) => {
        const id = value;
        const options = this.makeOptionswithoutToken("GET");
        return fetch(URL + "/api/shop/" + id, options).then(handleHttpErrors);
    }

    getreviewbyid = async(value) => {
        const id = value;
        console.log("id", id)
        const options = this.makeOptionswithoutToken("GET");
        return fetch(URL + "/api/review/" + id, options).then(handleHttpErrors);
    }
    
}

const facade = new Facade();

export default facade;