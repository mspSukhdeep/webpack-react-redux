import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import ReactPromise from 'redux-promise';

import history from './utils/history'
import App from './components/app';
import reducers from './reducers';
import ScrollToTop from './utils/ScrollTop';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(ReactPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter history={history} basename="/m/pwa" >
        <ScrollToTop>
            <App />
        </ScrollToTop>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

registerServiceWorker();
