import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(login(user.id));
        renderApp();
        if(history.location.pathname === '/') {
            history.push('/dashboard');
        }
        history.push('/dashboard');
        console.log('hello')
    } else {
        store.dispatch(logout());
        renderApp();
    }
})

