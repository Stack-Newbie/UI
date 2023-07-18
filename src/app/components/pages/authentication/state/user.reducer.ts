import * as userActions from './user.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { USER_MODEL } from '../../../../shared/models/user.model';
import * as fromRoot from '../../../../state/app.state';

// HELPERS
import { ID_GENERATOR } from 'src/app/shared/helpers/id-generator';

export interface UserState extends EntityState<USER_MODEL> {
    selectedUserId: number | null,
    loading: boolean,
    loaded: boolean,
    error: string
}

export interface AppState extends fromRoot.AppState {
    users: UserState
}

// DEFAULT ID
const DEFAULT_ID = ID_GENERATOR.generateNumericId(10);

export const userAdapter: EntityAdapter<USER_MODEL> = createEntityAdapter<USER_MODEL>({
    selectId: (e) => e.user_id || DEFAULT_ID /* DEFAULT ID WILL BE USED IF user_id IS ABSENT */
});

export const defaultUser: UserState = {
    ids: [],
    entities: {},
    selectedUserId: null,
    loading: false,
    loaded: false,
    error: ""
}

export const initialState = userAdapter.getInitialState((defaultUser));

export function userReducer(
    state = initialState,
    action: userActions.extendedAction
): UserState {
    switch (action.type) {
        /* ALL USERS */
        case userActions.UserActionTypes.LOAD_USERS_SUCCESS: {
            return userAdapter.addMany(action.payload, {
                ...state,
                loading: false,
                loaded: true
            })
        }
        case userActions.UserActionTypes.LOAD_USERS_FAIL: {
            return {
                ...state,
                entities: {},
                loading: false,
                loaded: false,
                error: action.payload
            }
        }

        /* SINGLE USER */
        case userActions.UserActionTypes.LOAD_USER_SUCCESS: {
            return userAdapter.addOne(action.payload, {
                ...state,
                selectedUserId: action.payload.user_id
            })
        }
        case userActions.UserActionTypes.LOAD_USER_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        /* CREATE USER */
        case userActions.UserActionTypes.CREATE_USER_SUCCESS: {
            return userAdapter.addOne(action.payload, state);
        }
        case userActions.UserActionTypes.CREATE_USER_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

/* FEATURE SELECTORS */
const getUserFeatureState = createFeatureSelector<UserState>(
    "users"
);

export const getUsers = createSelector(
    getUserFeatureState,
    userAdapter.getSelectors().selectAll
);

export const getUsersLoading = createSelector(
    getUserFeatureState,
    (state: UserState) => state.loading
);

export const getUsersLoaded = createSelector(
    getUserFeatureState,
    (state: UserState) => state.loaded
);

export const getError = createSelector(
    getUserFeatureState,
    (state: UserState) => state.error
);

// SELECTORS FOR LOADING SELECTOR USER IN EDIT PROFILE COMPONENT
export const getCurrentUserId = createSelector(
    getUserFeatureState,
    (state: UserState) => state.selectedUserId
)

export const getCurentUser = createSelector(
    getUserFeatureState,
    getCurrentUserId,
    state => state.selectedUserId !== null ? state.entities
    [state.selectedUserId] : null
)