import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { catchError, EmptyError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // recebe as informações do formulário
  formulario!: FormGroup;

  validation: boolean = false;
  validationButton: boolean = false;
  autenticado: boolean = false;
  validationText: string = '';

  errorMessage: string = '';

  constructor(
    private UserServices: UserService,
    private router: Router,
    private formBuild: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    //Referenciando cad campo do formulário
    this.formulario = this.formBuild.group({
      email: [null],
      password: [null],
    });
  }

  submit() {
    try {
      this.UserServices.login(this.formulario.value).subscribe(
        (response) => {
          window.localStorage.setItem('token', response.body.token);
          window.sessionStorage.setItem('loged', response.body.userId);
          this.router.navigate(['/']);
        },
        (err) => {
          this.errorMessage = err.message;
          console.log(err);

          if (err.status !== 200) {
            this.validation = true;
            this.validationText = err.error.message;
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
