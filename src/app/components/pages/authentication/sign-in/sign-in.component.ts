// FILE PATHS
const logoIcon = "../../../assets/logos/web/png/logo_icon.png" as string;
const logoImage = "../../../assets/logos/web/png/logo_colored.png" as string;
const heroImage = "../../../assets/logos/web/png/logo_colored.png" as string;

// DEFAULT FORM DATA
const DEFAULT_FORM_DATA = {
  email: "Email" as string,
  password: "Password" as string,
};

// IMPORTS
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  IconDefinition,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Router, RouterModule } from "@angular/router";
import { UserService } from "src/app/shared/services/users.service";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { LOGIN_MODEL } from "src/app/shared/models/user.model";
import { RESPONSE_MODEL } from "src/app/shared/models/response.model";
import { REDIRECT_SERVICE } from "src/app/shared/services/redirect.service";

@Component({
  selector: "sign-in",
  templateUrl: "sign-in.component.html",
  styleUrls: ["sign-in.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
})
export class SignInComponent implements OnInit {
  /* DEFAULT PROPERTIES */
  logoIcon = logoIcon;
  logoImage = logoImage;
  heroImage = heroImage;
  warningIcon: IconDefinition = faExclamationTriangle;
  SIGN_IN_FORM!: FormGroup;
  DEFAULT_FORM_DATA = DEFAULT_FORM_DATA;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private redirectService: REDIRECT_SERVICE
  ) { }

  ngOnInit(): void {
    this.SIGN_IN_FORM = this.formBuilder.group({
      email: ["", [Validators.required, this.userService.EMAIL_PATTERN_VALIDATOR()]],
      password: ["", [Validators.required, this.userService.PASSWORD_PATTERN_VALIDATOR()]],
    });
  }

  //////////////////////////
  ///// AUTHENTICATION /////
  //////////////////////////
  SIGN_IN_USER() {
    if (this.SIGN_IN_FORM.valid) {
      const user: LOGIN_MODEL = this.SIGN_IN_FORM.value;
      // SIGN USER
      this.authenticationService.signInUser(user).subscribe((signInResponse: RESPONSE_MODEL) => {
        // RETRIEVE RESPONSE
        const response = signInResponse.response;
        // RETRIEVE TOKEN
        const TOKEN = signInResponse.TOKEN;
        // SAVE TOKEN TO LOCAL STORAGE
        localStorage.setItem("TOKEN", TOKEN);
        // Check if the email is "stacknewbie@gmail.com"
        if (user.email === 'stacknewbie@gmail.com') {
          // REDIRECT USER TO DASHBOARD
          this.redirectService.REDIRECT("dashboard");
        } else {
          // REDIRECT USER TO Q-A PANEL
          this.redirectService.REDIRECT("questions");
        }
      });
    }
  }
}


