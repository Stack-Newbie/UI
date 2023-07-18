// DEFAULT FORM DATA
const DEFAULT_FORM_DATA = {
    question: "Type question here..." as string,
    additional_info: "Additional information here..." as string,
    category: "Enter category(e.g javascript, debugging etc)" as string
};

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconDefinition, faQuestion, faClose, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { CREATE_QUESTION_MODEL, QUESTION_MODEL } from "src/app/shared/models/question.model";
import { MessageBoxService } from "src/app/shared/services/message-box.service";
import { PopUpService } from "src/app/shared/services/pop-up.service";

import { Store } from "@ngrx/store";
import * as questionActions from "../../../pages/QA-panel/state/question.actions";
import * as fromQuestion from "../../../pages/QA-panel/state/question.reducer";

/* CUSTOM MODULES */
import { DECODE_TOKEN } from "src/app/shared/helpers/token-verifier";


@Component({
    selector: 'ask-question',
    templateUrl: 'ask-question.component.html',
    styleUrls: ['ask-question.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule]
})
export class AskQuestionComponent implements OnInit {
    /* DEFAULT PROPERTIES */
    // SET isActive STATE TO false
    isActive: boolean = false;
    DEFAULT_FORM_DATA = DEFAULT_FORM_DATA;
    ASK_QUESTION_FORM!: FormGroup;
    /* ICONS */
    closeIcon: IconDefinition = faClose;
    questionMarkIcon: IconDefinition = faQuestion;
    warningIcon: IconDefinition = faExclamationTriangle;

    constructor(
        private store: Store<fromQuestion.AppState>,
        private formBuilder: FormBuilder, 
        private popUpService: PopUpService, 
        private messageBoxService: MessageBoxService
    ) { }

    ngOnInit() {
        this.ASK_QUESTION_FORM = this.formBuilder.group({
            question: ['', Validators.required],
            additional_info: ['', Validators.required],
            category: ['', Validators.required]
        });

        this.popUpService.askQuestionForm$.subscribe(active => this.isActive = active);
        
    }

    // CLOSE FORM
    close_ASK_QUESTION_FORM(): void {
        // EMITS A BOOLEAN VALUE, false
        this.popUpService.closeAskQuestionForm();
    }

    // SUBMIT QUESTION
    SUBMIT_QUESTION() {

        // RETRIEVE AND DECODE TOKEN
        const TOKEN = localStorage.getItem("TOKEN");
        const DECODED_TOKEN = DECODE_TOKEN(TOKEN);
        
        // CREATE QUESTION
        const question: any = {
            question: this.ASK_QUESTION_FORM.get("question")?.value,
            additional_info: this.ASK_QUESTION_FORM.get("additional_info")?.value,
            category: this.ASK_QUESTION_FORM.get("category")?.value,
            user_id: DECODED_TOKEN.user_id as number,
            display_name: DECODED_TOKEN.display_name as string
        }
        
        // IF QUESTION IS VALID
        if (question) {
            // DISPATCH ACTION
            this.store.dispatch(new questionActions.AddQuestion(question));

            // RESET FORM
            this.ASK_QUESTION_FORM.reset();

            this.messageBoxService.SHOW_SUCCESS_MESSAGE("Question submitted successfully!");
        }

    }
}