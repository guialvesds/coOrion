import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from 'src/app/model/Card';
import { ViewCardComponent } from '../view-card.component';

import { UserService } from 'src/app/services/user.service';
import { CardService } from 'src/app/services/card.service';
import { User } from 'src/app/model/User';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
  cardData!: Card;

  userData!: User[] | any;
  allUserData!: User[] | any;

  memberForm!: FormGroup;
  memberList: any;
  memberEmail!: any;

  faXmark = faXmark;

  validation: boolean = false;
  validationText: string = '';

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
  }

  searchs(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.userData = this.allUserData.filter(
      (item: { name: string; email: string }) => {
        return (
          item.name!.toLowerCase().includes(value) ||
          item.email!.toLowerCase().includes(value)
        );
      }
    );
  }

  getUsers() {
    this.UserService.findUsers().subscribe((item) => {
      this.userData = item;
      this.allUserData = item;
    });
  }

  onchange(e: Event, user: User): void {
    // let checked = ((<HTMLInputElement>e.target).checked);
    let cardId = this.cardData._id;

    let dados = {
      memberName: user.name,
      memberEmail: user.email,
      userId: user._id,
    };

    const member = this.cardData.members;

    for (let m of member!) {
      this.memberEmail = m.memberEmail;
    }

    if (this.memberEmail !== user.email) {
      this.cardServices.addMmeber(cardId, dados).subscribe({
        next: ({}) => {
          this.snackBar.openSnackBar('Membro adicionado com sucesso!');
          this.validation = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.validation = true;
      this.validationText = 'Membro já existe nesse card!';
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
