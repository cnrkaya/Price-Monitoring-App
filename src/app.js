import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';
import { startSetProducts } from './actions/products';
import { startSetRecommendedProducts } from './actions/recommendedProducts';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

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
        store.dispatch(login(user.uid));
        store.dispatch(startSetProducts()).then(() => {
            store.dispatch(startSetRecommendedProducts()).then(() => {
                renderApp();
                if(history.location.pathname === '/') {
                    history.push('/dashboard');
                };
            })
        });
        history.push('/dashboard');
    } else {
        store.dispatch(logout());
        renderApp();
        history.push("/");
    }
})

