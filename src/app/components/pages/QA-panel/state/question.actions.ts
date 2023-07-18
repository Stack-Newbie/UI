import { Action } from "@ngrx/store";

import { Update } from "@ngrx/entity";

import { QUESTION_MODEL } from "../../../../shared/models/question.model";

/* USER ACTION TYPES */
export enum QuestionActionTypes {
    // ALL QUESTIONS
    LOAD_QUESTIONS = "[Question] Load Questions",
    LOAD_QUESTIONS_SUCCESS = "[Question] Load Questions Success",
    LOAD_QUESTIONS_FAIL = "[Question] Load Questions Fail",
    // SINGLE USER
    LOAD_QUESTION = "[Question] Load Question",
    LOAD_QUESTION_SUCCESS = "[Question] Load Question Success",
    LOAD_QUESTION_FAIL = "[Question] Load Question Fail",
    // ADD QUESTION
    ADD_QUESTION = "[Question] Add Question",
    ADD_QUESTION_SUCCESS = "[Question] Add Question Success",
    ADD_QUESTION_FAIL = "[Question] Add Question Fail",
    // UPDATE QUESTION
    UPDATE_QUESTION = "[Question] Update Question",
    UPDATE_QUESTION_SUCCESS = "[Question] Update Question Success",
    UPDATE_QUESTION_FAIL = "[Question] Update Question Fail",
    // DELETE QUESTION
    DELETE_QUESTION = "[Question] Delete Question",
    DELETE_QUESTION_SUCCESS = "[Question] Delete Question Success",
    DELETE_QUESTION_FAIL = "[Question] Delete Question Fail",
}

/* LOAD QUESTION CLASSES */
export class LoadQuestions implements Action {
    readonly type = QuestionActionTypes.LOAD_QUESTIONS;
}

export class LoadQuestionsSuccess implements Action {
    readonly type = QuestionActionTypes.LOAD_QUESTIONS_SUCCESS;

    constructor(public payload: QUESTION_MODEL[]) { }
}

export class LoadQuestionsFail implements Action {
    readonly type = QuestionActionTypes.LOAD_QUESTIONS_FAIL;

    constructor(public payload: string) { }
}

/* LOAD QUESTION */
export class LoadQuestion implements Action {
    readonly type = QuestionActionTypes.LOAD_QUESTION;

    constructor(public payload: number) { }
}

export class LoadQuestionSuccess implements Action {
    readonly type = QuestionActionTypes.LOAD_QUESTION_SUCCESS;

    constructor(public payload: QUESTION_MODEL) { }
}

export class LoadQuestionFail implements Action {
    readonly type = QuestionActionTypes.LOAD_QUESTION_FAIL;

    constructor(public payload: string) { }
}

/* ADD QUESTION */
export class AddQuestion implements Action {
    readonly type = QuestionActionTypes.ADD_QUESTION;

    constructor(public payload: QUESTION_MODEL) { }
}

export class AddQuestionSuccess implements Action {
    readonly type = QuestionActionTypes.ADD_QUESTION_SUCCESS;

    constructor(public payload: QUESTION_MODEL) { }
}

export class AddQuestionFail implements Action {
    readonly type = QuestionActionTypes.ADD_QUESTION_FAIL;

    constructor(public payload: string) { }
}

/* UPDATE QUESTION */
export class UpdateQuestion implements Action {
    readonly type = QuestionActionTypes.UPDATE_QUESTION;

    constructor(public payload: QUESTION_MODEL) { }
}

export class UpdateQuestionSuccess implements Action {
    readonly type = QuestionActionTypes.UPDATE_QUESTION_SUCCESS;

    constructor(public payload: Update<QUESTION_MODEL>) { }
}

export class UpdateQuestionFail implements Action {
    readonly type = QuestionActionTypes.UPDATE_QUESTION_FAIL;

    constructor(public payload: string) { }
}

/* DELETE QUESTION */
export class DeleteQuestion implements Action {
    readonly type = QuestionActionTypes.DELETE_QUESTION;

    constructor(public payload: number) { }
}

export class DeleteQuestionSuccess implements Action {
    readonly type = QuestionActionTypes.DELETE_QUESTION_SUCCESS;

    constructor(public payload: number) { }
}

export class DeleteQuestionFail implements Action {
    readonly type = QuestionActionTypes.DELETE_QUESTION_FAIL;

    constructor(public payload: string) { }
}

// EXPORT EXTENDED ACTION
export type extendedAction =
    | LoadQuestions
    | LoadQuestionsSuccess
    | LoadQuestionsFail
    | LoadQuestion
    | LoadQuestionSuccess
    | LoadQuestionFail
    | AddQuestion
    | AddQuestionSuccess
    | AddQuestionFail
    | UpdateQuestion
    | UpdateQuestionSuccess
    | UpdateQuestionFail
    | DeleteQuestion
    | DeleteQuestionSuccess
    | DeleteQuestionFail;
