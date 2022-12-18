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
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-attach',
  templateUrl: './attach.component.html',
  styleUrls: ['./attach.component.css']
})
export class AttachComponent implements OnInit {

  cardData!: Card;

  userData!: User[] | any;
  allUserData!: User[] | any;

  memberForm!: FormGroup;
  memberList: any;

  faXmark = faXmark;

  constructor(
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
    this.getUsers();

    this.memberForm = this.formBuid.group({
      memberList: new FormControl(),
    });

    console.log(this.cardData);
  }

  async getUsers() {
    await this.UserService.findUsers().subscribe((item) => {
      this.userData = item;
      this.allUserData = item;

      console.log('userdata', item);
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
