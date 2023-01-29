import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from 'src/app/model/Card';
import { ViewCardComponent } from '../view-card.component';

import { UserService } from 'src/app/services/user.service';
import { CardService } from 'src/app/services/card.service';
import { User } from 'src/app/model/User';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

import { Router } from '@angular/router';

import {
  faTimes,
  faFloppyDisk,
  faXmark,
  faPen,
  faRupiahSign,
  faArrowsRotate,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  cardData!: Card;

  userData!: User[] | any;
  allUserData!: User[] | any;

  listForm!: FormGroup;
  memberList: any;

  faXmark = faXmark;

  titleFormat: Boolean = false;

  constructor(
    private route: Router,
    private taskService: TaskService,
    private snackBar: SnackBarComponent,
    private cardServices: CardService,
    private formBuid: FormBuilder,
    private UserService: UserService,
    public dialogRef: MatDialogRef<ViewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cardData = data;
  }

  ngOnInit(): void {
    this.listForm = this.formBuid.group({
      title: new FormControl(),
    });

    console.log('dados Card', this.cardData._id);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createList() {
    const idCard: any = this.cardData._id;

    const dados = {
      title: this.listForm.value.title,
      idCard: idCard,
    };

    const titleValue = this.listForm.value.title;

    if (titleValue == null) {
      this.titleFormat = true;
    } else {
      this.taskService.createListService(idCard, dados).subscribe(
        () => {
          this.snackBar.openSnackBar('Lista criada com sucesso!');
          this.titleFormat = false;          
          setTimeout(() => {           
            this.closeDialog();
            window.location.reload();
          }, 350);
        },
        (err) => {
          console.log(err);
          this.snackBar.openSnackBar(
            'Ops, não foi possível criar a sua lista!'
          );
        }
      );
    }
  }
}
