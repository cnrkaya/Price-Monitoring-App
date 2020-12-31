import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRouter = (
    <Route 
        component={(props) => (
            <Component {...props} />
        )}
    />
);