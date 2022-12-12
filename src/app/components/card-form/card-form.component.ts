import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Card } from 'src/app/model/Card';

import { Router } from '@angular/router';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent implements OnInit {
  @Output() onsubmit = new EventEmitter<Card>();
  @Input() cardData!: Card;
  @Input() btnText!: string;
  @Input() title!: string;

  cardForm!: FormGroup;

  dateDelivery!: String;

  states: string[] = [
    'Backlog',
    'Design',
    'A Fazer',
    'Em andamento',
    'Revisão de código',
    'Fase de teste',
    'Concluído 🎉',
  ];

  constructor(private formBuild: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.cardForm = this.formBuild.group({
      code: new FormControl(this.cardData ? this.cardData.code : ''),
      title: new FormControl(this.cardData ? this.cardData.title : ''),
      tag: new FormControl(this.cardData ? this.cardData.tag : ''),
      delivery_date: new FormControl(
        this.cardData ? this.cardData.delivery_date : ''
      ),
    });

    // if(!this.productData){
    //   this.code.disable
    // }
  }

  get code() {
    return this.cardForm.get('code')!;
  }
  get name() {
    return this.cardForm.get('title')!;
  }

  submit() {
    // if(!this.name.valid){
    //     return;
    // }
    console.log(this.cardForm.value);
    this.onsubmit.emit(this.cardForm.value);
    console.log(this.cardForm.value);
  }

  back() {
    this.router.navigate(['/']);
  }
}
