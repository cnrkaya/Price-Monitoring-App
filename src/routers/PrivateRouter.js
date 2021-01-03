import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRouter = ({ component: Component, ...rest }) => (
    <Route 
        component={(props) => (
            <Component {...props} />
        )}
    />
);

export default PrivateRouter;