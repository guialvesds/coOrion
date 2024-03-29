import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewCardComponent } from '../view-card.component';

import { UserService } from 'src/app/services/user.service';
import { CardService } from 'src/app/services/card.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

import { ActivatedRoute, Params, Router } from '@angular/router';

import {
  faTimes,
  faFloppyDisk,
  faXmark,
  faPen,
  faRupiahSign,
  faArrowsRotate,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/model/User';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  taskForm!: FormGroup;
  faXmark = faXmark;

  titleFormat: Boolean = false;

  taskData: any = [];
  public member = new FormControl('');
  public user!: User[] | any

  constructor(
    private route: Router,
    private taskService: TaskService,
    private snackBar: SnackBarComponent,
    private cardServices: CardService,
    private formBuid: FormBuilder,
    private UserService: UserService,
    public dialogRef: MatDialogRef<ViewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.taskData = data;
  }

  ngOnInit(): void {

    this.taskForm = this.formBuid.group({
      titleTask: new FormControl(this.taskData ? this.taskData.titleTask : '' ),
      memberTask: new FormControl(this.taskData ? this.taskData.member : ''),
      delivery_date: new FormControl(this.taskData ? this.taskData.delivery_date : ''),
    });
    this.getUser();

    console.log(this.taskData);
    
  }
  public getUser(){
    this.UserService.findUsers().subscribe((item) => this.user = item)
  }

  public getName(s: FormControl): String {
    if (this.getValidValueMember(s)) {
      return '';
    }
    return s.value[0].name;
  }
  
  public getValidValueMember(f: FormControl): boolean {
    return !f.value && f.value === '';
  }

  public validSizeMemberInDisplay(f: FormControl): boolean {
    return (f.value?.length || 0) > 1;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  editTask(){

    const value = this.taskForm.value;
    const listId = this.taskData._listId;
    const taskId = this.taskData._id
    
    const dados = {
      titleTask: value.titleTask,
      member: this.member.value,
      delivery_date: value.delivery_date,
    }

    console.log(FormControl);
    

    this.taskService.editTaskservice(listId, taskId, dados).subscribe();
    
    this.snackBar.openSnackBar('Editado com sucesso!');

    setTimeout(() => {
      this.closeDialog();
    }, 350);
    
   }

}
