import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Card } from 'src/app/model/Card';
import { ViewCardComponent } from '../view-card.component';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/User';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({

  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
cardData!: Card;

userData!: User[] | any;
allUserData!: User[] | any;

memberForm!: FormGroup

constructor(
  private formBuid: FormBuilder,
    private UserService: UserService,
    public dialogRef: MatDialogRef<ViewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
      this.cardData = data
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

    this.userData = this.allUserData.filter((item: { name: any; email: any; }) => {
      return (
        item.name!.toLowerCase().includes(value) ||
        item.email!.toLowerCase().includes(value) 
      );
    });
  }

  async getUsers(){
      await  this.UserService.getUsers().subscribe((item) => {
        this.userData = item;
        this.allUserData = item;

        console.log("userdata", item);
    });

  }

  addMember(e: any){
    const member = this.memberForm.value;

    console.log(member.length);

  }

}
