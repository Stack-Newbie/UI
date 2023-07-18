import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, tap } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class PopUpService {
    /* DEFINE PROPERTIES TO HOLD THE ACTIVE STATE */

    // ASK QUESTION FORM SUBJECT
    private askQuestionFormSubject = new Subject<boolean>();
    askQuestionForm$ = this.askQuestionFormSubject.asObservable();

    // EDIT QUESTION FORM SUBJECT
    private editQuestionFormSubject = new Subject<boolean>();
    editQuestionForm$ = this.editQuestionFormSubject.asObservable();

    private editQuestionFormContentSubject = new BehaviorSubject<any>(null);
    editQuestionFormContent$ = this.editQuestionFormContentSubject.asObservable();

    // PREPOPULATE FORM SUBJECT
    private prepopulateFormSubject = new Subject<any>();
    prepopulateForm$ = this.prepopulateFormSubject.asObservable();

    /* METHODS FOR OPENING POP UPS */
    openAskQuestionForm(): void {
        this.askQuestionFormSubject.next(true);
        this.editQuestionFormSubject.next(false);
    }

    openEditQuestionForm(): void {
        this.editQuestionFormSubject.next(true);
        this.askQuestionFormSubject.next(false);
    }

    /* PREPOPULATE FORM */
    prepopulateEditQuestionForm(question: any) {
        this.editQuestionFormContentSubject.next(question);
        this.prepopulateFormSubject.next(question);
    }

    getEditQuestionForm() {
        return this.editQuestionFormSubject.asObservable().pipe(
          tap((value: any) => {
            console.log(value);
          })
        );
    }
    

    /* METHODS FOR CLOSING POP UPS */
    closeAskQuestionForm(): void {
        this.askQuestionFormSubject.next(false);
    }

    closeEditQuestionForm(): void {
        this.editQuestionFormSubject.next(false);
    }
}