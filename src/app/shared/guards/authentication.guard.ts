import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

export function authGuardFactory(
    authenticationService: AuthenticationService,
    router: Router
) {
    return () => {
        const TOKEN = authenticationService.RETRIEVE_TOKEN();
        if (TOKEN) {
            // ALLOW ACCESS IF TOKEN EXISTS
            return true;
        } else {
            // REDIRECT TO sign-in IF TOKEN DOESN'T EXIST
            router.navigate(["sign-in"])
            return false;
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const guardFn = authGuardFactory(this.authenticationService, this.router);
        return guardFn();
    }
}