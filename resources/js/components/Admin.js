import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Navbar from './admin/components/Navbar';
import Sidebar from './admin/components/Sidebar';
import Footer from './admin/components/Footer';
import Dashboard from './admin/components/Dashboard';
import Product from './admin/components/Product';
import Login from './admin/components/Login';

function Admin() {
    return (
        <Router>
            <Login />
            <div className="wrapper">
                {/* <Navbar />
                <Sidebar />
                <div className="content-wrapper">
                    <Switch>
                            <Route exact path="/admin"><Redirect to="/admin/dashboard"></Redirect></Route>
                            <Route exact path="/admin/dashboard"><Dashboard /></Route>
                            <Route exact path="/admin/product"><Product /></Route>
                    </Switch>
                </div>
                <Footer /> */}
            </div>
        </Router>
    );
}

export default Admin;

if (document.getElementById('admin')) {
    ReactDOM.render(<Admin />, document.getElementById('admin'));
}
