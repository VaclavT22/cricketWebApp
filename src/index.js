import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, NavLink, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header'
import App from './App';
import Products from './pages/products/Products'
import Orders from './pages/orders/Orders'
import Customers from './pages/customers/Customers'
import NotFound from './pages/NotFound'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
    <Router>
        <div>
            <Header />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/products" component={Products} />
                <Route path="/orders" component={Orders} />
                <Route path="/customers" component={Customers} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
