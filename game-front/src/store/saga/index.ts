import {all} from 'redux-saga/effects';
import {storiesWatcherSaga} from './stories';
import {usersWatcherSaga} from './users';
import {paragraphsWatcherSaga} from './paragraphs';
import {authWatcherSaga} from './auth';
export function* rootSaga() {
    yield all([authWatcherSaga(), storiesWatcherSaga(), usersWatcherSaga(), paragraphsWatcherSaga()])
}
