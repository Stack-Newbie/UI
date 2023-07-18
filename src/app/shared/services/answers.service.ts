import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PageReloaderService } from "./page-reloader.service";

@Injectable({
    providedIn: "root"
})
export class AnswerService {
    /* BASE URL */
    private BASE_URL = `http://localhost:8000`;
    private MAILING_SERVICE = `http://localhost:5000`;

    constructor(private HTTP: HttpClient, private pageReloaderService: PageReloaderService) { }

    // RETRIEVE TOKEN
    private TOKEN = localStorage.getItem("TOKEN") || "";

    /* ADD ANSWER */
    addAnswer(answer: any) {

        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "TOKEN": this.TOKEN
        });

        setTimeout(() => {
            this.pageReloaderService.REFRESH_ROUTE();
        }, 1500);

        return this.HTTP.post(`${this.BASE_URL}/answers`, answer, { headers });
    }

    /* UPVOTE ANSWER */
    upvoteAnswer(answer_id: number, user_id: number) {
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "TOKEN": this.TOKEN
        });

        const payload = { user_id: user_id, vote_type: "upvote" }

        return this.HTTP.post(`${this.BASE_URL}/answers/upvote/${answer_id}`, payload, { headers });
    }

    /* DOWNVOTE */
    downvoteAnswer(answer_id: number, user_id: number) {
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "TOKEN": this.TOKEN
        });

        const payload = { user_id: user_id, vote_type: "downvote" };

        return this.HTTP.post(`${this.BASE_URL}/answers/downvote/${answer_id}`, payload, { headers });
    }

    /* DELETE USER */
    markAsPreferred(payload: number): Observable<any> {
        const url = `${this.MAILING_SERVICE}/mark-as-preferred/${payload}`;
        return this.HTTP.post(url, null);
    }
}