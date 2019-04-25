import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../models/authRequest';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {

    private signUpForm: FormGroup;
    private UserEmail: string = ' ';
    private UserPassword: string = ' ';
    private readonly ErrorMessage = "Incorrect login details";
    private showErrorMessage: boolean = false;
    private submitted = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.signUpForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: this.MustMatch('password', 'confirmPassword')
        });
    }

    private login(): void {

        this.submitted = true;

        if (this.signUpForm.invalid) {
            return;
        }

        let signUpRequest: AuthRequest = {
            username: this.signUpForm.controls['email'].value.trim(),
            password: this.signUpForm.controls['password'].value.trim(),
        }

        this.authService.signUp(signUpRequest)
            .subscribe((isUserSignedUp) => {
                this.doNavigate(isUserSignedUp)
            });

    }

    private get f() {
        return this.signUpForm.controls;
    }

    private MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({
                    mustMatch: true
                });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
    private doNavigate(isUserSignedUp: Boolean) {
        if (isUserSignedUp) {
            this.router.navigate(['']);
        }
    }

}