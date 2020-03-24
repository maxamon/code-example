import {
    Action,
    ADD_PARAGRAPHS,
    CLEAR_REFERRER,
    LOADING_PARAGRAPHS,
    LOGIN,
    LOGOUT,
    RESET_PARAGRAPHS,
    SAVE_REFERRER,
    UPDATE_PARAGRAPHS,
    UPDATE_STORIES,
    UPDATE_USERS
} from '../actions';
import {AUTH, Paragraph, Story} from '../../interfaces';
import {User} from '../../../../angular-front-end/src/app/interfaces';

export function setLogin(state = AUTH.FETCHING_AUTH, action: Action) {
    switch (action.type) {
        case LOGIN:
            return AUTH.IS_AUTH;
        case LOGOUT:
            return AUTH.NOT_AUTH;
        default:
            return state;
    }
}

export function stories(state: Story[] = [], action: Action) {
    switch (action.type) {
        case UPDATE_STORIES:
            return action.payload;
        default:
            return state;
    }
}

export function paragraphs(state: Paragraph[] = [], action: Action) {
    switch (action.type) {
        case ADD_PARAGRAPHS:
            return [...state, action.payload];
        case UPDATE_PARAGRAPHS:
            // state.filter(({id}) => id !== action.payload.id)
            return action.payload;
        case RESET_PARAGRAPHS:
            return action.payload;
        case LOADING_PARAGRAPHS:
            return [];
        default:
            return state;
    }
}

export function users(state: User[] = [], action: Action) {
    switch (action.type) {
        case UPDATE_USERS:
            return action.payload;
        default:
            return state;
    }
}

export function referer(state: string = '', action: Action) {
    switch (action.type) {
        case SAVE_REFERRER:
            return action.payload;
        case CLEAR_REFERRER:
            return '';
        default:
            return state;
    }
}
