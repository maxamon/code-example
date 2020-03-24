import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {Action, FETCH_LOGIN, FETCH_SIGNIN, FETCH_USERS, FETCH_LOGOUT, logout, setLogin, updateUsers, clearReferrer} from '../actions';
import {instance} from './axios.base';
import {SignInFormData} from '../../pages/SignIn';
import {LoginFormData} from '../../pages/Login';

function fetchUsers() {
    return instance.get('users');
}

function fetchLogin(data: LoginFormData) {
    return instance.post('login', data);
}

function fetchLogout() {
    return instance.get('logout');
}

function fetchSignIn(data: SignInFormData) {
    return instance.post('signin', data);
}

function* getUsers() {
    console.log('getUsers');
    try {
        const { data } = yield call(fetchUsers);
        console.log(data);
        yield put(updateUsers(data.result));
    } catch (e) {
        console.log(e);
    }
}

function* getLogin(action: Action) {
    console.log('getLogin');
    try {
        const { referer } = action.payload;
        const { data } = yield call(fetchLogin, action.payload);
        yield put(setLogin());
        yield put(push(referer || '/'));
        yield put(clearReferrer())
    } catch (e) {
        console.log(e);
    }
}

function* getLogout() {
    console.log('getLogout');
    try {
        yield call(fetchLogout);
        yield put(logout());
        yield put(push('/'));
    } catch (e) {
        console.log(e);
    }
}

function* signIn(action: Action) {
    console.log('signIn');
    try {
        const { data } = yield call(fetchSignIn, action.payload);
        console.log(data);
        yield put(setLogin());
        yield put(push('/'));
    } catch (e) {
        console.log(e);
    }
}

export function* usersWatcherSaga() {
    yield takeLatest(FETCH_USERS, getUsers);
    yield takeLatest(FETCH_LOGIN, getLogin);
    yield takeLatest(FETCH_SIGNIN, signIn);
    yield takeLatest(FETCH_LOGOUT, getLogout);
}
