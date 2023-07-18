import { Injectable } from "@angular/core";
import { FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LOGIN_MODEL, USER_MODEL } from "../models/user.model";
import { MessageBoxService } from "./message-box.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    /* BASE URL */
    private BASE_URL = `http://localhost:8000`;
    private MAIL_BASED_REGISTRATION = `http://localhost:5000`;
    private RESET_PASSWORD_URL = `http://localhost:4000`;

    constructor(private HTTP: HttpClient, private messageBoxService: MessageBoxService) { }

    /* GET ALL USERS */
    getUsers(): Observable<USER_MODEL[]> {
        console.log('Fetching Users...');
        return this.HTTP.get<USER_MODEL[]>(this.BASE_URL + '/users');
    }

    /* GET USER BY ID */
    getUserById(payload: number): Observable<USER_MODEL> {
        return this.HTTP.get<USER_MODEL>(this.BASE_URL + `/users${payload}`);
    }

    /* CREATE USER */
    createUser(payload: USER_MODEL): Observable<USER_MODEL> {
        return this.HTTP.post<USER_MODEL>(this.MAIL_BASED_REGISTRATION + '/sign-up', payload);
    }

    /* UPDATE USER */
    updateUser(user: USER_MODEL): Observable<USER_MODEL> {
        return this.HTTP.patch<USER_MODEL>(`${this.BASE_URL}/users/${user.user_id}`,
            user
        );
    }

    /* DELETE USER */
    deleteUser(payload: number) {
        return this.HTTP.delete(`${this.BASE_URL}/users/${payload}`);
    }

    resetPassword(form: FormGroup) {

        const email: string = form.get("email")?.value;
        const password: string = form.get("password")?.value;

        const payload: LOGIN_MODEL = {
            email: email,
            password: password
        };

        return this.HTTP.put(`${this.RESET_PASSWORD_URL}/reset/password/${email}`, payload)
    }

    /**************************
    **** CUSTOM VALIDATORS ****
    **************************/
    // EMAIL PATTERN VALIDATOR
    EMAIL_PATTERN_VALIDATOR(): ValidatorFn {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return Validators.pattern(emailPattern);
    }

    // PASSWORD PATTERN VALIDATOR
    PASSWORD_PATTERN_VALIDATOR(): ValidatorFn {
        const passwordPattern = /^(?=.*[A-Za-z])[A-Za-z\d\S]{8,}$/;
        return Validators.pattern(passwordPattern);
    }
}