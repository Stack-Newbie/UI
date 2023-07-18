import * as questionActions from './question.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { QUESTION_MODEL } from '../../../../shared/models/question.model';
import * as fromRoot from '../../../../state/app.state';

// HELPERS
import { ID_GENERATOR } from 'src/app/shared/helpers/id-generator';


export interface QuestionState extends EntityState<QUESTION_MODEL> {
    selectedQuestionId: number | null,
    loading: boolean,
    loaded: boolean,
    error: string
}

export interface AppState extends fromRoot.AppState {
    questions: QuestionState
}

// DEFAULT ID
const DEFAULT_ID = ID_GENERATOR.generateNumericId(10);

export const questionAdapter: EntityAdapter<QUESTION_MODEL> = createEntityAdapter<QUESTION_MODEL>({
    selectId: (e) => e.question_id || DEFAULT_ID /* DEFAULT ID WILL BE USED IF question_id IS ABSENT */
});

export const defaultQuestion: QuestionState = {
    ids: [],
    entities: {},
    selectedQuestionId: null,
    loading: false,
    loaded: false,
    error: ""
}

export const initialState = questionAdapter.getInitialState((defaultQuestion));

export function questionReducer(
    state = initialState,
    action: questionActions.extendedAction
): QuestionState {
    switch (action.type) {
        /* ALL QUESTIONS */
        case questionActions.QuestionActionTypes.LOAD_QUESTIONS_SUCCESS: {
            return questionAdapter.addMany(action.payload, {
                ...state,
                loading: false,
                loaded: true
            })
        }
        case questionActions.QuestionActionTypes.LOAD_QUESTIONS_FAIL: {
            return {
                ...state,
                entities: {},
                loading: false,
                loaded: false,
                error: action.payload
            }
        }

        /* SINGLE QUESTION */
        case questionActions.QuestionActionTypes.LOAD_QUESTION_SUCCESS: {
            return questionAdapter.addOne(action.payload, {
                ...state,
                selectedQuestionId: action.payload.question_id
            })
        }
        case questionActions.QuestionActionTypes.LOAD_QUESTION_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        /* ADD QUESTION */
        case questionActions.QuestionActionTypes.ADD_QUESTION_SUCCESS: {
            return questionAdapter.addOne(action.payload, state);
        }
        case questionActions.QuestionActionTypes.ADD_QUESTION_FAIL: {
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
const getQuestionFeatureState = createFeatureSelector<QuestionState>(
    "questions"
);

export const getQuestions = createSelector(
    getQuestionFeatureState,
    questionAdapter.getSelectors().selectAll
);

export const getQuestionsLoading = createSelector(
    getQuestionFeatureState,
    (state: QuestionState) => state.loading
);

export const getQuestionsLoaded = createSelector(
    getQuestionFeatureState,
    (state: QuestionState) => state.loaded
);

export const getError = createSelector(
    getQuestionFeatureState,
    (state: QuestionState) => state.error
);

// SELECTORS 
export const getCurrentQuestionId = createSelector(
    getQuestionFeatureState,
    (state: QuestionState) => state.selectedQuestionId
)

export const getCurentQuestion = createSelector(
    getQuestionFeatureState,
    getCurrentQuestionId,
    state => state.selectedQuestionId !== null ? state.entities[state.selectedQuestionId] : null
)