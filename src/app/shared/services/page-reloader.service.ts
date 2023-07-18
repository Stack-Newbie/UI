import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class PageReloaderService {
    REFRESH_ROUTE(): void {
        /* RELOAD CURRENT ROUTE */
        location.reload();
    }
}