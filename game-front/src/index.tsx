import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router';

import { App } from './App';
import { initStore, sagaMiddleware } from './store';
import { rootSaga } from './store/saga';

const history = createBrowserHistory();
const store = initStore(history);
sagaMiddleware.run(rootSaga);

render(
    (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    ),
    document.getElementById('app')
);
