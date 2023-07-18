import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import * as questionActions from "./question.actions";
import { QUESTION_MODEL } from "src/app/shared/models/question.model";
import { QuestionService } from "src/app/shared/services/questions.service";

@Injectable()
export class QuestionEffect {
  constructor(private actions$: Actions, private questionService: QuestionService) { }

  /* GET ALL QUESTIONS */
  loadQuestions$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<questionActions.LoadQuestions>(questionActions.QuestionActionTypes.LOAD_QUESTIONS),
      mergeMap((actions: questionActions.LoadQuestions) =>
        this.questionService.getQuestions().pipe(
          map((questions: QUESTION_MODEL[]) => new questionActions.LoadQuestionsSuccess(questions)),
          catchError((err) => of(new questionActions.LoadQuestionsFail(err)))
        )
      )
    )
  );

  /* GET SINGLE QUESTION */
  loadQuestion$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<questionActions.LoadQuestion>(questionActions.QuestionActionTypes.LOAD_QUESTION),
      mergeMap((action: questionActions.LoadQuestion) =>
        this.questionService.getQuestionById(action.payload).pipe(
          map((question: QUESTION_MODEL) => new questionActions.LoadQuestionSuccess(question)),
          catchError((err) => of(new questionActions.LoadQuestionFail(err)))
        )
      )
    )
  );

  /* ADD QUESTION */
  addQuestion$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<questionActions.AddQuestion>(questionActions.QuestionActionTypes.ADD_QUESTION),
      map((action: questionActions.AddQuestion) => action.payload),
      mergeMap((question: QUESTION_MODEL) =>
        this.questionService.addQuestion(question).pipe(
          map(
            (newQuestion: QUESTION_MODEL) => new questionActions.AddQuestionSuccess(newQuestion)
          ),
          catchError((err) => of(new questionActions.AddQuestionFail(err)))
        )
      )
    )
  );

  /* UPDATE QUESTION */
  updateQuestion$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<questionActions.UpdateQuestion>(questionActions.QuestionActionTypes.UPDATE_QUESTION),
      map((action: questionActions.UpdateQuestion) => action.payload),
      mergeMap((question: QUESTION_MODEL) =>
        this.questionService.updateQuestion(question).pipe(
          map(
            (updateQuestion: QUESTION_MODEL) =>
              new questionActions.UpdateQuestionSuccess({
                id: updateQuestion.question_id,
                changes: updateQuestion,
              })
          ),
          catchError((err) => of(new questionActions.UpdateQuestionFail(err)))
        )
      )
    )
  );

  /* DELETE QUESTION */
  deleteQuestion$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<questionActions.DeleteQuestion>(questionActions.QuestionActionTypes.DELETE_QUESTION),
      map((action: questionActions.DeleteQuestion) => action.payload),
      mergeMap((id: number) =>
        this.questionService.deleteQuestion(id).pipe(
          map(() => new questionActions.DeleteQuestionSuccess(id)),
          catchError((err) => of(new questionActions.DeleteQuestionFail(err)))
        )
      )
    )
  );
}
