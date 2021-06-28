import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from './admin/components/Navbar';
import Home from './admin/components/Home';
import Footer from './admin/components/Footer';

function Admin() {
    return (
        <Router>
            <Navbar />
            <Switch>
                    <Route exact path="/"><Home /></Route>
            </Switch>
            <Footer />
        </Router>
    );
}

export default Admin;

if (document.getElementById('admin')) {
    ReactDOM.render(<Admin />, document.getElementById('admin'));
}
