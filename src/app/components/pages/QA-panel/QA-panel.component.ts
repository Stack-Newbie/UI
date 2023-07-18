// FILE PATHS
const logo = "../../../assets/logos/web/png/logo_colored.png" as string;

import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, NgModel, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
    IconDefinition,
    faPen,
    faPencilAlt,
    faBars,
    faSearch,
    faLifeRing,
    faDesktop,
    faAngleUp,
    faAngleDown,
    faCheckCircle,
    faQuestion,
    faBriefcase,
    faFileLines,
    faTag,
    faUser,
    faBookmark,
    faBullhorn,
    faTableCells,
    faPaperPlane,
    faMessage,
    faThumbsUp,
    faEye,
    faLocation,
    faGlobe,
    faQuestionCircle,
    faDoorOpen,
    faDeleteLeft,
    faComment
} from "@fortawesome/free-solid-svg-icons";
import { AskQuestionComponent } from "../../pop-ups/questions/ask-question/ask-question.component";
import { PopUpService } from "src/app/shared/services/pop-up.service";
import { EditQuestionComponent } from "../../pop-ups/questions/edit-question/edit-question.component";
import { Observable } from "rxjs";
import { QUESTION_MODEL } from "src/app/shared/models/question.model";
import { Store, select } from "@ngrx/store";

import * as fromQuestion from '../QA-panel/state/question.reducer';
import * as questionActions from '../QA-panel/state/question.actions';
import { MessageBoxComponent } from "../../message-box/message-box.component";
import { MessageBoxService } from "src/app/shared/services/message-box.service";
import { AnswerService } from "src/app/shared/services/answers.service";
import { DECODE_TOKEN } from "src/app/shared/helpers/token-verifier";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { TempService } from "src/app/shared/services/temp.service";

/* CUSTOM PIPES */
import { SearchFilterPipe } from '../../../shared/pipes/search-filter.pipe';
import { QuestionService } from "src/app/shared/services/questions.service";
import { PageReloaderService } from "src/app/shared/services/page-reloader.service";
import { CommentService } from "src/app/shared/services/comment.service";

@Component({
    selector: "home",
    templateUrl: "QA-panel.component.html",
    styleUrls: ["QA-panel.component.css"],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, AskQuestionComponent, EditQuestionComponent, MessageBoxComponent, FormsModule, SearchFilterPipe]
})
export class QAPanelComponent implements OnInit {
    /* DEFAULT PROPERTIES */
    isActive: boolean = false;
    searchTerm: string = "";
    questions$!: Observable<QUESTION_MODEL[]>;
    error$!: Observable<string>;
    answerForm!: FormGroup;
    commentForm!: FormGroup;
    // RETRIEVE AND DECODE TOKEN
    private TOKEN = localStorage.getItem("TOKEN");
    private DECODED_TOKEN = DECODE_TOKEN(this.TOKEN);
    // SET user_id FROM TOKEN
    user_id: number = this.DECODED_TOKEN.user_id;

    /* ICONS */
    logo = logo;
    doorIcon: IconDefinition = faDoorOpen;
    menuIcon: IconDefinition = faBars;
    searchIcon: IconDefinition = faSearch;
    helpIcon: IconDefinition = faLifeRing;
    desktopIcon: IconDefinition = faDesktop;
    deleteIcon: IconDefinition = faDeleteLeft;
    upIcon: IconDefinition = faAngleUp;
    downIcon: IconDefinition = faAngleDown;
    checkIcon: IconDefinition = faCheckCircle;
    questionMarkIcon: IconDefinition = faQuestion;
    questionMarkIconAlt: IconDefinition = faQuestionCircle;
    briefCaseIcon: IconDefinition = faBriefcase;
    documentIcon: IconDefinition = faFileLines;
    tagIcon: IconDefinition = faTag;
    userIcon: IconDefinition = faUser;
    bookmarkIcon: IconDefinition = faBookmark;
    bullHornIcon: IconDefinition = faBullhorn;
    tableIcon: IconDefinition = faTableCells;
    inboxIcon: IconDefinition = faMessage;
    commentIcon: IconDefinition = faComment;
    paperPlaneIcon: IconDefinition = faPaperPlane;
    thumbsUpIcon: IconDefinition = faThumbsUp;
    eyeIcon: IconDefinition = faEye;
    penIcon: IconDefinition = faPen;
    pencilIcon: IconDefinition = faPencilAlt;
    pinIcon: IconDefinition = faLocation;
    globeIcon: IconDefinition = faGlobe;

    // INJECT MODULAR SERVICES
    constructor(
        private popUpService: PopUpService,
        private store: Store,
        private formBuilder: FormBuilder,
        private messageBoxService: MessageBoxService,
        private questionService: QuestionService,
        private answerService: AnswerService,
        private commentService: CommentService,
        private authenticationService: AuthenticationService,
        private pageReloaderService: PageReloaderService,
        private tempService: TempService
    ) { }

    ngOnInit() {
        this.displayQuestions();
        this.error$ = this.store.pipe(select(fromQuestion.getError));

        // INITIALIZE answerForm
        this.answerForm = this.formBuilder.group({
            answer: ["", [Validators.required]]
        });

        // INITIALIZE commentForm
        this.commentForm = this.formBuilder.group({
            comment: ["", [Validators.required]]
        });
    }

    IS_AUTHORIZED(question_asker_id: any): boolean {
        // COMPARE user_id FROM TOKEN WITH user_id FROM QUESTION
        return question_asker_id === this.user_id;
    }

    LOGOUT() {
        this.authenticationService.SIGN_OUT();
    }

    displayQuestions() {
        this.store.dispatch(new questionActions.LoadQuestions());
        this.questions$ = this.store.pipe(select(fromQuestion.getQuestions));

        // SHOW WELCOME MESSAGE WHEN
        if (this.questions$) {
            this.messageBoxService.SHOW_SUCCESS_MESSAGE("Embrace curiosity, ignite your mind.");
        }
    }

    // FORMAT SQL DATE OBJECT
    formatDate(dateStr: string): string {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
        // RETURN FORMATTED DATE
        return date.toLocaleDateString("en-US", options);
    }

    // CHANGE isActive STATE TO true
    alter_ASK_QUESTION_FORM_state(): void {
        // EMITS A BOOLEAN VALUE, true
        this.popUpService.openAskQuestionForm();
    }

    // CHANGE isActive STATE TO true
    alter_EDIT_QUESTION_FORM_state(question: any): void {
        // EMITS A BOOLEAN VALUE true
        this.popUpService.openEditQuestionForm();
        this.popUpService.prepopulateEditQuestionForm(question);
        this.tempService.setQuestion(question);
    }

    addAnswer(question_id: number) {
        const answer: any = {
            answer: this.answerForm.value.answer,
            question_id: question_id,
            user_id: this.DECODED_TOKEN.user_id as number,
            display_name: this.DECODED_TOKEN.display_name as string
        };

        this.answerService.addAnswer(answer).subscribe(() => {
            this.messageBoxService.SHOW_SUCCESS_MESSAGE("Adding answer...");

            this.answerForm.reset();
        },
            (error) => {
                this.messageBoxService.SHOW_ERROR_MESSAGE(`Failed to add answer: ${error.message}`)
                console.error(error);
            }
        );
    }

    UPVOTE(answer_id: number) {
        // GET user_id
        const user_id = this.DECODED_TOKEN.user_id;

        this.answerService.upvoteAnswer(answer_id, user_id).subscribe(() => {
            this.messageBoxService.SHOW_SUCCESS_MESSAGE("Answer upvoted...");
        },
            (error) => {
                console.error(error);
                this.messageBoxService.SHOW_ERROR_MESSAGE(`${error.error}`);
            }
        );
    }

    DOWNVOTE(answer_id: number) {
        // GET user_id
        const user_id = this.DECODED_TOKEN.user_id;

        this.answerService.downvoteAnswer(answer_id, user_id).subscribe(() => {
            this.messageBoxService.SHOW_SUCCESS_MESSAGE("Answer downvoted...");
        },
            (error) => {
                console.error(error);
                this.messageBoxService.SHOW_ERROR_MESSAGE(`${error.error}`);
            }
        );
    }

    MARK_AS_PREFERRED(answer_id: number) {
        // console.log(answer_id);
        this.answerService.markAsPreferred(answer_id).subscribe(() => {
            this.messageBoxService.SHOW_SUCCESS_MESSAGE("Answer marked as preferred...");
        },
            (error) => {
                this.messageBoxService.SHOW_ERROR_MESSAGE(`Failed to mark answer as preferred: ${error}`);
            }
        );
    }

    DELETE_QUESTION(question_id: number) {
        // CONFIRM DELETION
        if (confirm("You're about to delete a question, do you wish to proceed?")) {
            this.questionService.deleteQuestion(question_id).subscribe(() => {
                // SUCCESS STATE
                this.messageBoxService.SHOW_SUCCESS_MESSAGE("Deleting question");
            },
                // ERROR STATE
                (error) => {
                    console.error(error);
                    this.messageBoxService.SHOW_ERROR_MESSAGE(error.error);
                });

            // REFRESH ROUTE AFTER 1.2S
            setTimeout(() => {
                this.pageReloaderService.REFRESH_ROUTE();
            }, 1200);
        }
    }

    addComment(answer_id: number) {
        const comment: any = {
            comment: this.commentForm.value.comment,
            answer_id: answer_id,
            user_id: this.DECODED_TOKEN.user_id
        };

        this.commentService.addComment(comment).subscribe(() => {
            this.messageBoxService.SHOW_SUCCESS_MESSAGE("Adding comment...");

            this.commentForm.reset();
        },
            (error) => {
                this.messageBoxService.SHOW_ERROR_MESSAGE(`Failed to add comment: ${error.message}`)
                console.error(error);
            }
        );
    }
}                                                                                                                                                        
