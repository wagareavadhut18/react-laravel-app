import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from './frontend/components/Navbar';
import Search from './frontend/components/Search';
import Home from './frontend/components/Home';
import Footer from './frontend/components/Footer';
import About from './frontend/components/About';
import Shop from './frontend/components/Shop';
import Contact from './frontend/components/Contact';

function App() {
    return (
        <Router>
          <Navbar />
          <Search />
          <Switch>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/about"><About /></Route>
                <Route exact path="/shop"><Shop /></Route>
                <Route exact path="/contact"><Contact /></Route>
                {/* <Route exact path="/*" component={Pagenotfound}></Route> */}
          </Switch>
          <Footer />
    </Router>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
