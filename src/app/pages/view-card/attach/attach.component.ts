import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from 'src/app/model/Card';
import { ViewCardComponent } from '../view-card.component';

import { UserService } from 'src/app/services/user.service';
import { CardService } from 'src/app/services/card.service';
import { User } from 'src/app/model/User';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

import {
  faTimes,
  faFloppyDisk,
  faXmark,
  faPen,
  faRupiahSign,
  faArrowsRotate,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attach',
  templateUrl: './attach.component.html',
  styleUrls: ['./attach.component.css'],
})
export class AttachComponent implements OnInit {
  cardData!: Card;
  memberForm!: FormGroup;

  faXmark = faXmark;

  file!: File;

  validation: boolean = false;
  validationText: string = '';

  constructor(
    private router: Router,
    private snackBar: SnackBarComponent,
    private cardServices: CardService,
    private formBuid: FormBuilder,
    private UserService: UserService,
    public dialogRef: MatDialogRef<ViewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cardData = data;
  }

  ngOnInit(): void {}

  onFileSelected(e: Event) {
    if (!e?.target) {
      return;
    }
    const target = e?.target! as any;
    this.file = target.files[0];
    console.log(this.file);
    console.log(e);
  }

  hasFile(): boolean {
    return !!this.file;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  upload(idCard: any) {
    const idC = idCard;
    const dados = new FormData();
    dados.append('uploads', this.file);

    this.cardServices
      .uploadArq(idC, dados)
      .pipe()
      .subscribe({
        next: () => {
          this.snackBar.openSnackBar('Arquivo adicionado com sucesso!');
          this.closeDialog();
        },
        error: (err) => {
          console.log('erro importação de arquivo', err);
          this.validation = true;
          this.validationText =
            'Ops, não foi possível enviar o arquivo, tente novamente!';        },
      });
  }
}
