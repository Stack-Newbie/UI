// FILE PATHS
const logoIcon = "../../../assets/logos/web/png/logo_icon.png" as string;
const logoBanner = "../../../assets/logos/web/png/logo_colored.png" as string;

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faSquareArrowUpRight, faPen } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule, FontAwesomeModule]
})
export class HomeComponent {
    /* DEFAULT PROPERTIES */
    logoIcon = logoIcon;
    logoBanner = logoBanner;
    linkIcon: IconDefinition = faSquareArrowUpRight;
    penIcon: IconDefinition = faPen;
}