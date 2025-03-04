import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivateRouter = ({ 
    isAuthenticated,
    component: Component, 
    ...rest
    }) => (
        <Route {...rest} component={(props) => (
                isAuthenticated ? (
                    <div>
                        <Header />
                        <Component {...props} />  
                        <Footer />                  
                    </div>
                ) : (
                    <Redirect to='/' />
                )
            )}
        />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRouter);