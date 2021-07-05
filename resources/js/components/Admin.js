import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Navbar from './admin/components/Navbar';
import Sidebar from './admin/components/Sidebar';
import Footer from './admin/components/Footer';
import Dashboard from './admin/components/Dashboard';
import Product from './admin/components/Product';
import Login from './admin/components/Login';
import { Provider, connect } from "react-redux";
import dmart from "./reduxstore/store";

function Admin(props) {
    // console.log("admin props===",props);
    return (
        <Provider store={dmart}>
            <Router>
                <div className="wrapper">
                    <Switch>
                        <Route exact path="/admin"><Login /></Route>
                        {localStorage.getItem('loginstatus') ? <Route exact path="/admin/dashboard"><Dashboard /></Route> : <Route exact path="/admin/dashboard"><Redirect to="/admin" /></Route> }
                        <Route exact path="/admin/product"><Product /></Route>
                    </Switch>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
}


function mapStateToProp(state,props){
    // console.log("state>>>",state,"props>>>>",props)
    // console.log("cart count>>",state.CartReducer.cart.length);
    return {
        isloggedin:state.AdminReducer.isloggedin
    }
}

export default connect(mapStateToProp)(Admin);

// export default Admin;

if (document.getElementById('admin')) {
    ReactDOM.render(<Admin />, document.getElementById('admin'));
}
