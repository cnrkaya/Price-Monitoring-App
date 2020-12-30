import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DashboardPage from './components/DashboardPage';
import configureStore from './store/configureStore';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <DashboardPage />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));