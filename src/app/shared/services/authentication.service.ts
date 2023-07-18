import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, throwError } from "rxjs";
import { RESPONSE_MODEL } from "../models/response.model";
import { LOGIN_MODEL } from "../models/user.model";
import { MessageBoxService } from "./message-box.service";
import { REDIRECT_SERVICE } from "./redirect.service";

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {
    /* BASE URL */
    private BASE_URL = `http://localhost:8000`;

    constructor(
        private HTTP: HttpClient,
        private messageBoxService: MessageBoxService,
        private redirectService: REDIRECT_SERVICE
    ) { }

    /* SIGN IN USER */
    signInUser(user: LOGIN_MODEL): Observable<RESPONSE_MODEL> {
        const headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return this.HTTP.post<RESPONSE_MODEL>(this.BASE_URL + '/auth/sign-in', user, { headers }).pipe(map(response => {
            // DISPLAY SUCCESS MESSAGE
            this.messageBoxService.SHOW_SUCCESS_MESSAGE("Signing in...");

            const TOKEN = response.TOKEN;
            return { response, TOKEN } as RESPONSE_MODEL;
        }),
            catchError((error: any) => {
                // DISPLAY ERROR MESSAGE
                this.messageBoxService.SHOW_ERROR_MESSAGE(error.error.message);
                return throwError(error);
            })
        );
    }

    /* SIGN OUT USER */
    SIGN_OUT() {
        localStorage.removeItem("TOKEN");

        // DISPLAY Sign Out MESSAGE
        this.messageBoxService.SHOW_SUCCESS_MESSAGE("Signing out...");

        setTimeout(() => {
            this.redirectService.REDIRECT("sign-in");
        }, 1500);
    }

    RETRIEVE_TOKEN(): string | null {
        // RETURN TOKEN OR null IF IT DOESN'T EXIST
        return localStorage.getItem("TOKEN");
    }
}