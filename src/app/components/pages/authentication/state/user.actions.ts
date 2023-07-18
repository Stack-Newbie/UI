import { Action } from "@ngrx/store";

import { Update } from "@ngrx/entity";

import { USER_MODEL } from "../../../../shared/models/user.model";

/* USER ACTION TYPES */
export enum UserActionTypes {
    // ALL USERS
    LOAD_USERS = "[User] Load Users",
    LOAD_USERS_SUCCESS = "[User] Load Users Success",
    LOAD_USERS_FAIL = "[User] Load Users Fail",
    // SINGLE USER
    LOAD_USER = "[User] Load User",
    LOAD_USER_SUCCESS = "[User] Load User Success",
    LOAD_USER_FAIL = "[User] Load User Fail",
    // CREATE USER
    CREATE_USER = "[User] Create User",
    CREATE_USER_SUCCESS = "[User] Create User Success",
    CREATE_USER_FAIL = "[User] Create User Fail",
    // UPDATE USER
    UPDATE_USER = "[User] Update User",
    UPDATE_USER_SUCCESS = "[User] Update User Success",
    UPDATE_USER_FAIL = "[User] Update User Fail",
    // DELETE USER
    DELETE_USER = "[User] Delete User",
    DELETE_USER_SUCCESS = "[User] Delete User Success",
    DELETE_USER_FAIL = "[User] Delete User Fail",
}

/* LOAD USER CLASSES */
export class LoadUsers implements Action {
    readonly type = UserActionTypes.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
    readonly type = UserActionTypes.LOAD_USERS_SUCCESS;

    constructor(public payload: USER_MODEL[]) { }
}

export class LoadUsersFail implements Action {
    readonly type = UserActionTypes.LOAD_USERS_FAIL;

    constructor(public payload: string) { }
}

/* LOAD USER */
export class LoadUser implements Action {
    readonly type = UserActionTypes.LOAD_USER;

    constructor(public payload: number) { }
}

export class LoadUserSuccess implements Action {
    readonly type = UserActionTypes.LOAD_USER_SUCCESS;

    constructor(public payload: USER_MODEL) { }
}

export class LoadUserFail implements Action {
    readonly type = UserActionTypes.LOAD_USER_FAIL;

    constructor(public payload: string) { }
}

/* CREATE USER */
export class CreateUser implements Action {
    readonly type = UserActionTypes.CREATE_USER;

    constructor(public payload: USER_MODEL) { }
}

export class CreateUserSuccess implements Action {
    readonly type = UserActionTypes.CREATE_USER_SUCCESS;

    constructor(public payload: USER_MODEL) { }
}

export class CreateUserFail implements Action {
    readonly type = UserActionTypes.CREATE_USER_FAIL;

    constructor(public payload: string) { }
}

/* UPDATE USER */
export class UpdateUser implements Action {
    readonly type = UserActionTypes.UPDATE_USER;

    constructor(public payload: USER_MODEL) { }
}

export class UpdateUserSuccess implements Action {
    readonly type = UserActionTypes.UPDATE_USER_SUCCESS;

    constructor(public payload: Update<USER_MODEL>) { }
}

export class UpdateUserFail implements Action {
    readonly type = UserActionTypes.UPDATE_USER_FAIL;

    constructor(public payload: string) { }
}

/* DELETE USER */
export class DeleteUser implements Action {
    readonly type = UserActionTypes.DELETE_USER;

    constructor(public payload: number) { }
}

export class DeleteUserSuccess implements Action {
    readonly type = UserActionTypes.DELETE_USER_SUCCESS;

    constructor(public payload: number) { }
}

export class DeleteUserFail implements Action {
    readonly type = UserActionTypes.DELETE_USER_FAIL;

    constructor(public payload: string) { }
}

// EXPORT EXTENDED ACTION
export type extendedAction =
    | LoadUsers
    | LoadUsersSuccess
    | LoadUsersFail
    | LoadUser
    | LoadUserSuccess
    | LoadUserFail
    | CreateUser
    | CreateUserSuccess
    | CreateUserFail
    | UpdateUser
    | UpdateUserSuccess
    | UpdateUserFail
    | DeleteUser
    | DeleteUserSuccess
    | DeleteUserFail;
