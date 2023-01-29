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
} from '@fortawesome/free-solid-svg-icons';
;
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  taskForm!: FormGroup;
  faXmark = faXmark;

  titleFormat: Boolean = false;

  listData!: string;

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
    this.listData = data;
  }

  ngOnInit(): void {
    this.taskForm = this.formBuid.group({
      titleTask: new FormControl(),
      memberTask: new FormControl(),
      delivery_date: new FormControl(),
    });

    console.log(this.listData);
    
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addTask(){
    const listId = this.listData;
    const title = this.taskForm.value;
    const member = this.taskForm.value

    const dados = {
      titleTask:  title.titleTask,
      member: member.memberTask,
      delivery_date: this.taskForm.value.delivery_date
    }

    if(title.titleTask == null){
      this.titleFormat = true;
    } else {
      this.taskService.addTasksServices(listId, dados).subscribe(
        () => {
          this.snackBar.openSnackBar('Tarefa criada com sucesso!');
          this.titleFormat = false;
          setTimeout(() => {
            this.closeDialog();
            window.location.reload();
          }, 350);
        },
        (err) => {
          console.log(err);
          this.snackBar.openSnackBar(
            'Ops, não foi possível criar a sua Tarefa!'
          );
        }
      );
    }  
  }
}
