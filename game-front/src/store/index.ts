import {applyMiddleware, combineReducers, createStore} from 'redux';
import {connectRouter, routerMiddleware, RouterState} from 'connected-react-router';
import {setLogin, stories, users, paragraphs, referer} from './reducers/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {History} from 'history'
import createSagaMiddleware from 'redux-saga';
import {AUTH, Paragraph, Story} from '../interfaces';
import {User} from '../../../angular-front-end/src/app/interfaces';

export const sagaMiddleware = createSagaMiddleware();

export const initStore = (history: History<any>) => createStore(
    combineReducers({
        router: connectRouter(history),
        setLogin,
        stories,
        users,
        referer,
        paragraphs
    }),
    composeWithDevTools(
        applyMiddleware(
            sagaMiddleware,
            routerMiddleware(history)
        )
    )
);

export interface StoreProps {
    setLogin: AUTH;
    router: RouterState;
    stories: Story[];
    users: User[];
    paragraphs: Paragraph[];
    referer: string;
}
