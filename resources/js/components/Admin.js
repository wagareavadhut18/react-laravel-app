import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from './admin/components/Navbar';
import Sidebar from './admin/components/Sidebar';
import Home from './admin/components/Home';
import Footer from './admin/components/Footer';

function Admin() {
    return (
        <Router>
            <Navbar />
            <Sidebar />
            <Switch>
                    <Route exact path="/admin"><Home /></Route>
            </Switch>
            <Footer />
        </Router>
    );
}

export default Admin;

if (document.getElementById('admin')) {
    ReactDOM.render(<Admin />, document.getElementById('admin'));
}
