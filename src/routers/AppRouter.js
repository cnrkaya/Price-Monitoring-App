import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import ProductDashboardPage from '../components/ProductDashboardPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import AddProductPage from '../components/AddProductPage';
import EditProductPage from '../components/EditProductPage';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRouter path='/' component={LoginPage} exact={true}/>
                <PrivateRouter path='/dashboard' component={ProductDashboardPage} />
                <PrivateRouter path='/create' component={AddProductPage} />
                <PrivateRouter path='/edit/:id' component={EditProductPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;