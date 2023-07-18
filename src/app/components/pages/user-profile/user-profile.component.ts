// FILE PATHS
const logo = "../../../assets/logos/web/png/logo_colored.png" as string;

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
    IconDefinition,
    faBars,
    faSearch,
    faLifeRing,
    faDesktop,
    faAngleDown,
    faQuestion,
    faBriefcase,
    faFileLines,
    faTag,
    faUser,
    faBookmark,
    faMessage,
    faEye,
    faLocation,
    faGlobe,
    faQuestionCircle,
    faTrash,
    faTableCells,
    faBullhorn
} from "@fortawesome/free-solid-svg-icons";
import { AskQuestionComponent } from "../../pop-ups/questions/ask-question/ask-question.component";
import { PopUpService } from "src/app/shared/services/pop-up.service";
import { EditQuestionComponent } from "../../pop-ups/questions/edit-question/edit-question.component";
import { DECODE_TOKEN } from "src/app/shared/helpers/token-verifier";
import { Store, select } from "@ngrx/store";
import { Observable, map } from "rxjs";
import { QUESTION_MODEL } from "src/app/shared/models/question.model";

import * as fromQuestion from '../QA-panel/state/question.reducer';
import * as questionActions from '../QA-panel/state/question.actions';

@Component({
    selector: "home",
    templateUrl: "user-profile.component.html",
    styleUrls: ["user-profile.component.css"],
    standalone: true,
    imports: [CommonModule, RouterModule, FontAwesomeModule, AskQuestionComponent, EditQuestionComponent],
})
export class UserProfileComponent implements OnInit {
    /* DEFAULT PROPERTIES */
    isActive: boolean = false;
    questions$!: Observable<QUESTION_MODEL[]>;
    error$!: Observable<string>;
    // RETRIEVE AND DECODE TOKEN
    private TOKEN = localStorage.getItem("TOKEN");
    private DECODED_TOKEN = DECODE_TOKEN(this.TOKEN);
    // SET user_id FROM TOKEN
    user_id: number = this.DECODED_TOKEN.user_id;
    display_name: string = this.DECODED_TOKEN.display_name;

    /* ICONS */
    logo = logo;
    menuIcon: IconDefinition = faBars;
    searchIcon: IconDefinition = faSearch;
    helpIcon: IconDefinition = faLifeRing;
    desktopIcon: IconDefinition = faDesktop;
    downIcon: IconDefinition = faAngleDown;
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
    eyeIcon: IconDefinition = faEye;
    pinIcon: IconDefinition = faLocation;
    globeIcon: IconDefinition = faGlobe;
    trashIcon: IconDefinition = faTrash;

    // INJECT MODULAR SERVICES
    constructor(private popUpService: PopUpService, private store: Store) { }

    ngOnInit() {
        this.displayQuestions();
        this.error$ = this.store.pipe(select(fromQuestion.getError));

    }

    displayQuestions() {
        this.store.dispatch(new questionActions.LoadQuestions());
        this.questions$ = this.store.pipe(
          select(fromQuestion.getQuestions),
          map((questions: QUESTION_MODEL[]) => questions.filter(question => question.question_asker === this.display_name))
        );
      }
      


    alter_ASK_QUESTION_FORM_state(): void {
        // EMITS A BOOLEAN VALUE, true
        this.popUpService.openAskQuestionForm();
    }
}
