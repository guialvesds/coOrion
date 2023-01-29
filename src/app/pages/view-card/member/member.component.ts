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

import {
  MatSnackBar,
} from '@angular/material/snack-bar';


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

  getMembersControls() {
    return this.memberForm.get('memberList')
      ? (<FormArray>this.memberForm.get('memberList')).controls
      : null;
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

  async getUsers() {
    await this.UserService.findUsers().subscribe((item) => {
      this.userData = item;
      this.allUserData = item;
    });
  }

  onchange(e: Event, user: User) {
    let checked = ((<HTMLInputElement>e.target).checked = true);

    let memberId: string = '';
    let userId: any = '';

    let memberUser = this.cardData.members;

    memberUser?.forEach((item) => {
      memberId = item.userId;
    });

    if (memberId === user._id) {
      this.snackBar.openSnackBar('Ops, membro já existe nesse cartão.');
    } else if(!checked && userId !== user._id) {
      this.snackBar.openSnackBar('É necessário selecionar pelo menos uma opção.');
    }

    let cardId = this.cardData._id;

    let dados = {
      memberName: user.name,
      memberEmail: user.email,
      userId: user._id,
    };
    this.snackBar.openSnackBar("Membro adicionado com sucesso!");
    return this.cardServices.addMmeber(cardId, dados).subscribe();
  
  }

  closeDialog(){
    this.dialogRef.close();
    window.location.reload();
  }
}
