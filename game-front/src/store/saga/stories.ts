import { takeLatest, call, put } from 'redux-saga/effects';
import {Action, CREATE_STORY, FETCH_STORIES, logout, updateStories} from '../actions';
import {Story} from '../../interfaces';
import {instance} from './axios.base';

function fetchStories() {
    return instance.get('stories');
}

function createStoryRequest(data: Story) {
    return instance.post('stories', data);
}

function* getStories() {
    console.log('getStories');
    try {
        const { data } = yield call(fetchStories);
        console.log(data);
        yield put(updateStories(data.result));
        if (!data.auth) {
            yield put(logout());
        }
    } catch (e) {
        console.log(e);
    }
}

function* createStory(action: Action) {
    console.log('getStories');
    try {
        yield call(createStoryRequest, action.payload);
        const { data } = yield call(fetchStories);
        console.log(data);
        yield put(updateStories(data.result));
    } catch (e) {
        console.log(e);
    }
}

export function* storiesWatcherSaga() {
    yield takeLatest(FETCH_STORIES, getStories);
    yield takeLatest(CREATE_STORY, createStory);
}
