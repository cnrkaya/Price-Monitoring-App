import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PrivateRouter';
import ProductDashboardPage from '../components/ProductDashboardPage';
import AddProductPage from '../components/AddProductPage';
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route component={ProductDashboardPage}/>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;