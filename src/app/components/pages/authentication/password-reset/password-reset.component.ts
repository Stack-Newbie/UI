// FILE PATHS
const logoIcon = "../../../assets/logos/web/png/logo_icon.png" as string;
const logoImage = "../../../assets/logos/web/png/logo_colored.png" as string;
const logoBanner = "../../../assets/logos/web/png/logo_colored.png" as string;

// DEFAULT FORM DATA
const DEFAULT_FORM_DATA = {
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
import { MessageBoxService } from "src/app/shared/services/message-box.service";
import { UserService } from "src/app/shared/services/users.service";

@Component({
  selector: "password-reset",
  templateUrl: "password-reset.component.html",
  styleUrls: ["password-reset.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
})
export class PasswordResetComponent implements OnInit {
  /* DEFAULT PROPERTIES */
  logoIcon = logoIcon;
  logoImage = logoImage;
  logoBanner = logoBanner;
  warningIcon: IconDefinition = faExclamationTriangle;
  DEFAULT_FORM_DATA = DEFAULT_FORM_DATA;
  PASSWORD_RESET_FORM!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageBoxService: MessageBoxService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.PASSWORD_RESET_FORM = this.formBuilder.group({
      email: ["", [Validators.required, this.userService.EMAIL_PATTERN_VALIDATOR()]],
      password: ["", [Validators.required, this.userService.PASSWORD_PATTERN_VALIDATOR()]]
    });
  }

  RESET_PASSWORD() {
    if (this.PASSWORD_RESET_FORM.valid) {
      this.userService.resetPassword(this.PASSWORD_RESET_FORM).subscribe(() => {
        // DISPLAY SUCCESS MESSAGE
        this.messageBoxService.SHOW_SUCCESS_MESSAGE("Resetting password...");
        // RESET FORM
        this.PASSWORD_RESET_FORM.reset();
        // REDIRECT USER TO SIGN IN PAGE AFTER 1.5s
        setTimeout(() => {
          this.router.navigate(['sign-in']);
        }, 1500)
      },
        (error) => {
          this.messageBoxService.SHOW_ERROR_MESSAGE(error.error);
        });
    }
  }
}
