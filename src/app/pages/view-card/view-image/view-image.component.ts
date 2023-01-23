import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewCardComponent } from '../view-card.component';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {

  imageData!: string;

  constructor(public dialogRef: MatDialogRef<ViewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.imageData = data;
  }

  ngOnInit(): void {
  }

}
