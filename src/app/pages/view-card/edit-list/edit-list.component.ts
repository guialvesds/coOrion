import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewCardComponent } from '../view-card.component';

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
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  listData!: any;
  listForm!: FormGroup;
  faXmark = faXmark;
  titleFormat: Boolean = false;

  constructor(
    private route: Router,
    private taskService: TaskService,
    private snackBar: SnackBarComponent,
    private formBuid: FormBuilder,
    public dialogRef: MatDialogRef<ViewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.listData = data;
  }

  ngOnInit(): void {
    this.listForm = this.formBuid.group({
      title: new FormControl( this.listData ? this.listData.title : ''),
    });

    console.log('dados Card', this.listData);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  editList() {
    const id = this.listData._id;  

    const titleList = this.listForm.value;

    const dados = {
      title: titleList.title,
    };

    this.taskService.editListService(id, dados).subscribe();
    this.snackBar.openSnackBar('Título alterado com sucesso!'); 
        setTimeout(() => {
          this.closeDialog();   
        }, 350);       
  }
}



