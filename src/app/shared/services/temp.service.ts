import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class TempService {
    private questionSubject = new BehaviorSubject<any>(null);
    question$ = this.questionSubject.asObservable();

    setQuestion(question: any) {
        this.questionSubject.next(question);
    }
}