import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { MustMatch } from '../../_helpers/must-match.validator';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  creationForm: FormGroup;
  submitted = false;
  errorMessage: string;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.router.navigate(["/profil"]);
    }
    this.createForm();
  }

  createForm(): void {
    this.creationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],

    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }


  registerUser(form): void {
    this.submitted = true;
    if (this.creationForm.valid) {
      this.authService
        .register(this.creationForm.value)
        .subscribe(data => this.handleSuccess(data)
          , err => {
            console.log(err.error);
            this.errorMessage = err.error.replace('Error:', '');
          });
    }
  }

  handleSuccess(data): void {
    this.creationForm.reset();
    this.submitted = false;
    this.router.navigate(['/auth']);
  }



}
