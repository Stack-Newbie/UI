// FILE PATHS
const logoIcon = "../../../assets/logos/web/png/logo_icon.png" as string;
const logoBanner = "../../../assets/logos/web/png/logo_colored.png" as string;

// DEFAULT FORM DATA
const DEFAULT_FORM_DATA = {
  display_name: "Display name..." as string,
  email: "Email" as string,
  password: "Password" as string,
};

// IMPORTS
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  IconDefinition,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

import * as userActions from "../state/user.actions";
import * as fromUser from "../state/user.reducer";
import { Store } from "@ngrx/store";
import { UserService } from "src/app/shared/services/users.service";
import { MessageBoxService } from "src/app/shared/services/message-box.service";

@Component({
  selector: "sign-up",
  templateUrl: "sign-up.component.html",
  styleUrls: ["sign-up.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
})
export class SignUpComponent implements OnInit {
  /* DEFAULT PROPERTIES */
  logoIcon = logoIcon;
  logoBanner = logoBanner;
  warningIcon: IconDefinition = faExclamationTriangle;
  DEFAULT_FORM_DATA = DEFAULT_FORM_DATA;
  SIGN_UP_FORM!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private store: Store<fromUser.AppState>,
    private messageBoxService: MessageBoxService
  ) { }

  ngOnInit(): void {
    this.SIGN_UP_FORM = this.formBuilder.group({
      display_name: ["", [Validators.required]],
      email: [
        "",
        [Validators.required, this.userService.EMAIL_PATTERN_VALIDATOR()],
      ],
      password: [
        "",
        [Validators.required, this.userService.PASSWORD_PATTERN_VALIDATOR()],
      ],
    });
  }

  /* CREATE USER */
  createUser() {
    const newUser: any = {
      display_name: this.SIGN_UP_FORM.get("display_name")?.value,
      email: this.SIGN_UP_FORM.get("email")?.value,
      password: this.SIGN_UP_FORM.get("password")?.value,
    };

    this.store.dispatch(new userActions.CreateUser(newUser));

    // RESET FORM
    this.SIGN_UP_FORM.reset();

    // DISPLAY SUCCESS MESSAGE
    this.messageBoxService.SHOW_SUCCESS_MESSAGE("Signing up...");

    // REDIRECT TO QA PANEL
    setTimeout(() => {
      this.REDIRECT_TO_SIGN_IN_PAGE();
    }, 2000);
  }

  REDIRECT_TO_SIGN_IN_PAGE(): void {
    this.router.navigate(["sign-in"]);
  }
}
