import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class REDIRECT_SERVICE {
    constructor(private router: Router) { }

    REDIRECT(route: string): void {
        // REDIRECT AFTER 2s
        setTimeout(() => {
            this.router.navigate([route]);
        }, 2000);
    }
}