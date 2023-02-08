import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewCardComponent } from '../view-card.component';

import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/model/User';
import { filter } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  public taskForm!: FormGroup;
  public faXmark = faXmark;

  public titleFormat: Boolean = false;

  public userList!: User[] | any;
  public member = new FormControl('');
  public memberEmail: string = '';

  private listData!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<ViewCardComponent>,
    private route: Router,
    private taskService: TaskService,
    private snackBar: SnackBarComponent,
    private formBuid: FormBuilder,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.fillData();
    this.getUsers();
    this.initFor();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public get getTitleTask() {
    return this.taskForm.value.titleTask;
  } // metodo acessor
  public get getMemberTask() {
    return this.member.value;
  } // metodo acessor
  public get getDeliveryDate() {
    return this.taskForm.value.delivery_date;
  } // metodo acessor

  public addTask(): void {
    this.taskService
      .addTasksServices({
        id: this.listData,
        titleTask: this.getTitleTask,
        member: this.getMemberTask,
        delivery_date: this.getDeliveryDate,
      })
      .subscribe({
        next: () => this.showSnackBar('Tarefa criada com sucesso!'),
        error: () => this.showSnackBar('Ops, não foi possível criar a sua Tarefa!', true),
      });

      console.log(this.member.value);      
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

  public getUsers(): void {
    this.UserService.findUsers().subscribe((item) => this.userList = item)
  }

  public validSizeMemberInDisplay(f: FormControl): boolean {
    return (f.value?.length || 0) > 1;
  }

  private initFor(): void {
    this.taskForm = this.formBuid.group({
      titleTask: [''],
      memberTask: [''],
      delivery_date: [''],
    });
  }

  private fillData(): void {
    this.listData = this.data;
  }
  
  private showSnackBar(m: string, isError: boolean = false): void {
    this.snackBar.openSnackBar(m);
    this.titleFormat = false;
    setTimeout(() => {
      if (isError) {
        this.closeDialog();
      }
    }, 350);
  }
}
