import {SignInFormData} from '../../pages/SignIn';
import {LoginFormData} from '../../pages/Login';
import {CreateParagraphProps, UpdateParagraphProps} from '../../interfaces';
import {Story} from '../../pages/Create';

export const LOGIN = 'LOGIN';
export type LOGIN = typeof LOGIN;

export const FETCH_LOGIN = 'FETCH_LOGIN';
export type FETCH_LOGIN = typeof FETCH_LOGIN;

export const LOGOUT = 'LOGOUT';
export type LOGOUT = typeof LOGOUT;

export const FETCH_LOGOUT = 'FETCH_LOGOUT';
export type FETCH_LOGOUT = typeof FETCH_LOGOUT;

export const FETCH_AUTH = 'FETCH_AUTH';
export type FETCH_AUTH = typeof FETCH_AUTH;

export const FETCH_SIGNIN = 'FETCH_SIGNIN';
export type FETCH_SIGNIN = typeof FETCH_SIGNIN;

export const FETCH_STORIES = 'FETCH_STORIES';
export type FETCH_STORIES = typeof FETCH_STORIES;

export const UPDATE_STORIES = 'UPDATE_STORIES';
export type UPDATE_STORIES = typeof UPDATE_STORIES;

export const FETCH_USERS = 'FETCH_USERS';
export type FETCH_USERS = typeof FETCH_USERS;

export const UPDATE_USERS = 'UPDATE_USERS';
export type UPDATE_USERS = typeof UPDATE_USERS;

export const CREATE_STORY = 'CREATE_STORY';
export type CREATE_STORY = typeof CREATE_STORY;

export const FETCH_PARAGRAPHS = 'FETCH_PARAGRAPHS';
export type FETCH_PARAGRAPHS = typeof FETCH_PARAGRAPHS;

export const UPDATE_PARAGRAPHS = 'UPDATE_PARAGRAPHS';
export type UPDATE_PARAGRAPHS = typeof UPDATE_PARAGRAPHS;

export const RESET_PARAGRAPHS = 'RESET_PARAGRAPHS';
export type RESET_PARAGRAPHS = typeof RESET_PARAGRAPHS;

export const ADD_PARAGRAPHS = 'ADD_PARAGRAPHS';
export type ADD_PARAGRAPHS = typeof ADD_PARAGRAPHS;

export const CREATE_PARAGRAPHS = 'CREATE_PARAGRAPHS';
export type CREATE_PARAGRAPHS = typeof CREATE_PARAGRAPHS;

export const FREEZE_PARAGRAPHS = 'FREEZE_PARAGRAPHS';
export type FREEZE_PARAGRAPHS = typeof FREEZE_PARAGRAPHS;

export const LOADING_PARAGRAPHS = 'LOADING_PARAGRAPHS';
export type LOADING_PARAGRAPHS = typeof LOADING_PARAGRAPHS;

export const SAVE_REFERRER = 'SAVE_REFERRER';
export type SAVE_REFERRER = typeof SAVE_REFERRER;

export const CLEAR_REFERRER = 'CLEAR_REFERRER';
export type CLEAR_REFERRER = typeof CLEAR_REFERRER;

export type ActionType = LOGIN | FETCH_LOGIN | LOGOUT | FETCH_STORIES | UPDATE_STORIES | UPDATE_USERS | FETCH_USERS | CREATE_STORY
    | FETCH_PARAGRAPHS | UPDATE_PARAGRAPHS | LOADING_PARAGRAPHS | FETCH_SIGNIN | FETCH_LOGOUT | CREATE_PARAGRAPHS | ADD_PARAGRAPHS
    | FETCH_AUTH | FREEZE_PARAGRAPHS | SAVE_REFERRER | CLEAR_REFERRER | RESET_PARAGRAPHS;

export interface Action {
    type: ActionType;
    action?: any;
    payload?: any;
}

export function login(data: LoginFormData): Action {
    return { type: FETCH_LOGIN, payload: data };
}
export function setLogin(): Action {
    return { type: LOGIN };
}

export function fetchAuth(): Action {
    return { type: FETCH_AUTH };
}

export function fetchSingIn(data: SignInFormData): Action {
    return { type: FETCH_SIGNIN, payload: data };
}

export function logout(): Action {
    return { type: LOGOUT };
}

export function fetchLogout(): Action {
    return { type: FETCH_LOGOUT };
}

export function fetchStories(): Action {
    return { type: FETCH_STORIES };
}

export function updateStories(data: any): Action {
    return { type: UPDATE_STORIES, payload: data }
}

export function fetchUsers(): Action {
    return { type: FETCH_USERS };
}

export function updateUsers(data: any): Action {
    return { type: UPDATE_USERS, payload: data }
}

export function createStory(data: Story): Action {
    return { type: CREATE_STORY, payload: data }
}

export function fetchParagraphs(data: any): Action {
    return { type: FETCH_PARAGRAPHS, payload: data };
}

export function resetParagraphs(data: any): Action {
    return { type: RESET_PARAGRAPHS, payload: data }
}
export function updateParagraphs(data: UpdateParagraphProps): Action {
    return { type: UPDATE_PARAGRAPHS, payload: data }
}
export function addParagraphs(data: any): Action {
    return { type: ADD_PARAGRAPHS, payload: data }
}
export function createParagraphs(data: CreateParagraphProps): Action {
    return {type: CREATE_PARAGRAPHS, payload: data}
}
export function freezeParagraph(data: any): Action {
    return { type: FREEZE_PARAGRAPHS, payload: data }
}
export function loadingParagraphs(): Action {
    return { type: LOADING_PARAGRAPHS}
}
export function saveReferrer(data: string): Action {
    return { type: SAVE_REFERRER, payload: data}
}
export function clearReferrer(): Action {
    return { type: CLEAR_REFERRER}
}
