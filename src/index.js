import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/reducers';

ReactDOM.render(
        <App />,
    document.getElementById('root'));

registerServiceWorker();
