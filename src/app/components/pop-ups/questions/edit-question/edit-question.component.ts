// DEFAULT FORM DATA
const DEFAULT_FORM_DATA = {
    question: "Type question here..." as string,
    additional_info: "Additional information here..." as string,
    category: "Enter category(e.g javascript, debugging etc)" as string
};

import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconDefinition, faCaretUp, faClose, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from "rxjs";
import { QUESTION_MODEL } from "src/app/shared/models/question.model";
import { PopUpService } from "src/app/shared/services/pop-up.service";
import * as fromQuestion from '../../../../components/pages/QA-panel/state/question.reducer';
import * as questionActions from '../../../pages/QA-panel/state/question.actions';
import { Store, select } from "@ngrx/store";
import { TempService } from "src/app/shared/services/temp.service";
import { QuestionService } from "src/app/shared/services/questions.service";
import { MessageBoxService } from "src/app/shared/services/message-box.service";
import { DECODE_TOKEN } from "src/app/shared/helpers/token-verifier";


@Component({
    selector: 'edit-question',
    templateUrl: 'edit-question.component.html',
    styleUrls: ['edit-question.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule]
})
export class EditQuestionComponent implements OnInit, OnDestroy {
    /* DEFAULT PROPERTIES */
    // SET isActive STATE TO false
    isActive: boolean = false;
    questions$!: Observable<QUESTION_MODEL[]>;
    error$!: Observable<string>;
    DEFAULT_FORM_DATA = DEFAULT_FORM_DATA;
    EDIT_QUESTION_FORM!: FormGroup;
    /* ICONS */
    closeIcon: IconDefinition = faClose;
    upIcon: IconDefinition = faCaretUp;
    warningIcon: IconDefinition = faExclamationTriangle;
    // RETRIEVE AND DECODE TOKEN
    private TOKEN = localStorage.getItem("TOKEN");
    private DECODED_TOKEN = DECODE_TOKEN(this.TOKEN);
    // SET user_id FROM TOKEN
    user_id: number = this.DECODED_TOKEN.user_id;

    private subscription: Subscription
    question: any;

    constructor(
        private formBuilder: FormBuilder,
        private popUpService: PopUpService,
        private store: Store<fromQuestion.AppState>,
        private tempService: TempService,
        private questionService: QuestionService,
        private messageBoxService: MessageBoxService
    ) {
        this.subscription = this.tempService.question$.subscribe(question => {
            this.question = question;
        });
    }

    ngOnInit() {
        this.getQuestions();
        this.error$ = this.store.pipe(select(fromQuestion.getError));

        this.EDIT_QUESTION_FORM = this.formBuilder.group({
            question: ['', Validators.required],
            additional_info: ['', Validators.required],
            category: ['', Validators.required]
        });

        this.popUpService.editQuestionForm$.subscribe(active => this.isActive = active);

        this.popUpService.prepopulateForm$.subscribe(question => {
            this.EDIT_QUESTION_FORM.patchValue({
                question: question.question,
                additional_info: question.additional_info,
                category: question.category
            });
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getQuestions() {
        this.store.dispatch(new questionActions.LoadQuestions());
        this.questions$ = this.store.pipe(select(fromQuestion.getQuestions));
    }

    // CLOSE FORM
    close_EDIT_QUESTION_FORM(): void {
        // EMITS A BOOLEAN VALUE, false
        this.popUpService.closeEditQuestionForm();
    }

    UPDATE_QUESTION() {
        const updatedQuestion: any = {
            question: this.EDIT_QUESTION_FORM.get("question")?.value,
            additional_info: this.EDIT_QUESTION_FORM.get("additional_info")?.value,
            category: this.EDIT_QUESTION_FORM.get("category")?.value,
            user_id: this.user_id,
            question_id: this.question.question_id
        };

        this.questionService.updateQuestion(updatedQuestion).subscribe((response) => {
            /* SUCCESS STATE */
            this.messageBoxService.SHOW_SUCCESS_MESSAGE(response.message);
        },
            (error) => {
                /* SUCCESS STATE */
                this.messageBoxService.SHOW_ERROR_MESSAGE("error.error");
                console.error(error);
            }
        );
    }
}
