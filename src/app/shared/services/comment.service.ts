import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PageReloaderService } from "./page-reloader.service";

@Injectable({
    providedIn: "root"
})
export class CommentService {
    private BASE_URL = `http://localhost:8000`;

    constructor(private HTTP: HttpClient, private pageReloaderService: PageReloaderService) { }

    // RETRIEVE TOKEN
    private TOKEN = localStorage.getItem("TOKEN") || "";

    /* ADD COMMENT */
    addComment(comment: any) {

        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "TOKEN": this.TOKEN
        });

        setTimeout(() => {
            this.pageReloaderService.REFRESH_ROUTE();
        }, 1500);

        return this.HTTP.post(`${this.BASE_URL}/comments`, comment, { headers });
    }
}