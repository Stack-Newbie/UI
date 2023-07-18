import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { QUESTION_MODEL, UPDATE_QUESTION_MODEL } from "../models/question.model";
import { PageReloaderService } from "./page-reloader.service";
import { MessageBoxService } from "./message-box.service";

@Injectable({
    providedIn: "root"
})
export class QuestionService {
    /* BASE URL */
    private BASE_URL = `http://localhost:8000`;

    constructor(
        private HTTP: HttpClient,
        private pageReloaderService: PageReloaderService,
        private messageBoxService: MessageBoxService
    ) { }

    /* GET ALL QUESTIONS */
    getQuestions(): Observable<QUESTION_MODEL[]> {
        return this.HTTP.get<QUESTION_MODEL[]>(this.BASE_URL + '/questions');
    }

    /* GET QUESTION BY ID */
    getQuestionById(payload: number): Observable<QUESTION_MODEL> {
        return this.HTTP.get<QUESTION_MODEL>(this.BASE_URL + `/questions${payload}`);
    }

    /* CREATE QUESTION */
    addQuestion(payload: QUESTION_MODEL): Observable<QUESTION_MODEL> {
        // RETRIEVE TOKEN
        const TOKEN = localStorage.getItem("TOKEN") || "";

        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "TOKEN": TOKEN
        });

        setTimeout(() => {
            this.pageReloaderService.REFRESH_ROUTE();
        }, 1500);

        return this.HTTP.post<QUESTION_MODEL>(this.BASE_URL + '/questions', payload, { headers });
    }

    /* UPDATE QUESTION */
    updateQuestion(question: any): Observable<any> {
        // RETRIEVE TOKEN
        const TOKEN = localStorage.getItem("TOKEN") || "";

        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "TOKEN": TOKEN
        });

        setTimeout(() => {
            this.pageReloaderService.REFRESH_ROUTE();
        }, 1500);

        return this.HTTP.put<any>(`${this.BASE_URL}/questions/${question.question_id}`,
            question,
            { headers }
        );
    }

    /* DELETE QUESTION */
    deleteQuestion(payload: number) {
        // RETRIEVE TOKEN
        const TOKEN = localStorage.getItem("TOKEN") || "";

        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "TOKEN": TOKEN
        });

        return this.HTTP.delete(`${this.BASE_URL}/questions/${payload}`, { headers });
    }
}