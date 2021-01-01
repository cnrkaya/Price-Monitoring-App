import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import ProductDashboardPage from '../components/ProductDashboardPage';
import AddProductPage from '../components/AddProductPage';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRouter path='/' component={ProductDashboardPage} exact={true}/>
                <PrivateRouter path='/create' component={AddProductPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;