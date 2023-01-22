import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { User } from 'src/app/model/User';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { AlertService } from 'src/app/services/alert.service';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  formulario!: FormGroup;
  validation: boolean = false;
  passValidation: boolean = false;

  constructor(
    private formBuild: FormBuilder,
    private router: Router,
    private userServices: UserService,
    private alert: AlertService,
    private snackBar: SnackBarComponent,
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuild.group({
      name: [null],
      sname: [null],
      email: [null],
      password: [null],
      rPassword: [null],
      member: [false],
      selected: [false]
    });
  }

  async submit() {
    if (
      this.formulario.value.name == null &&
      this.formulario.value.sname == null &&
      this.formulario.value.email == null &&
      this.formulario.value.password == null
    ) {
      this.validation = true;
      console.log('Todos os campos são obrigatórios!');
    } else if (
      this.formulario.value.password !== this.formulario.value.rPassword
    ) {
      this.validation = false;
      this.passValidation = true;
      console.log('Senhas não conferem!');
    } else {
      this.userServices.creatUser(this.formulario.value);

      console.log('Usuário cadastrado com sucesso!');    
      this.snackBar.openSnackBar('Usuário criado com sucesso!');

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  }
}
