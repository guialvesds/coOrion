import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CardService } from 'src/app/services/card.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/model/User';
import { Card } from 'src/app/model/Card';

import {
  faPen,
  faXmark,
  faNoteSticky,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ViewCardComponent } from '../view-card/view-card.component';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';
import { map } from 'rxjs';

export enum StatusCard{
  APPROVED = 'APPROVED',
  WARNING = 'WARNING',
  CANCEL = 'CANCEL',  
  DEFEAULT = 'DEFEAULT',
}

@Component({
  selector: 'app-info-home',
  templateUrl: './info-home.component.html',
  styleUrls: ['./info-home.component.css'],
})
export class InfoHomeComponent implements OnInit {
  allCards: Card | any = [];
  cards!: Card[] | any;
  user: User[] = [];
  @Output() cardData!: Card | any;

  idCard!: Card;

  totalP!: number;
  search: string = '';

  editIcon = faPen;
  removeIcon = faXmark;
  vewIcon = faNoteSticky;

  dateDelivery!: any;

  dateColor: any = {
    red: 'red',
    defeaut: 'green',
    orange: 'orange',
  };

statusColor: any = {
    approved: this.getColorApproved,
    warning: this.getColorWarning,
    cancel:  this.getColorCancel,
  };

  constructor(
    private cardServices: CardService,
    private alert: AlertService,
    private userServices: UserService,
    private dialogService: MatDialog,
    private route: Router,
    public activeModal: MatDialog,
    private snackBar: SnackBarComponent
  ) {}

  ngOnInit(): void {
    //inicializado a busca do produtos para exibilos no html
    this.cardServices
      .getCard()
      .pipe(
        map((card) => ({
          ...card,
          data: card.data.map((c: any) => this.novo(c)),
        }))
      )
      .subscribe({
        next: ({ data }) => {
          console.log(data);

          this.cards = data;
          this.allCards = data;
          this.totalP = data.length;

          // this.calculateDate();
        },
        error: (error) => {
          const dataError = error.statusText;
          if (dataError === 'Unauthorized') {
            this.route.navigate(['login']);
          }
        },
      });

    this.userServices.findUsers();
  }

  novo(c: any) {
    // this.statusColor[this.validDiftoDayApproved(this.getDiffDate(c)).toLowerCase()]();

    c.status = this.validDiftoDayApproved(this.getDiffDate(c));
    
    if (this.validDiftoDays(this.getDiffDate(c))) {
      // c.color = 'data-color-red';
      c.color = 'red';
    }
    if (this.validDiftoDaysT(this.getDiffDate(c))) {
      c.color = 'orange';
    } else if (this.validDiftoDaysN(this.getDiffDate(c))) {
      c.color = 'green';
    }
    // console.log(this.statusColor[this.validDiftoDayApproved(this.getDiffDate(c)).toLowerCase()]());
    
    return c;
  }

  // trueDate(): string {
  //   if(this.validDiftoDays(this.getDiffDate(c))){
  //     return this.dateColor.red;
  //   }

  //   return
  // }

  validDiftoDayApproved(diffDays: number): String {
    return diffDays <= 2 ? StatusCard.APPROVED : StatusCard.DEFEAULT
  }
   validDiftoDaysTWarning(diffDays: number): string {
    return diffDays >= 3 && diffDays <= 5 ? StatusCard.WARNING : StatusCard.DEFEAULT;
  }
  validDiftoDaysCancel(diffDays: number): string {
    return diffDays >= 6 ? StatusCard.CANCEL : StatusCard.DEFEAULT;
  }

  getColorApproved(){
    return this.dateColor.green
  }
  getColorWarning(){
    return this.dateColor.orange
  }  
  getColorCancel(){
    return this.dateColor.red
  }
  

  validDiftoDays(diffDays: number): boolean {
    return diffDays <= 2;
  }
  validDiftoDaysT(diffDays: number): boolean {
    return diffDays >= 3 && diffDays <= 5;
  }
  validDiftoDaysN(diffDays: number): boolean {
    return diffDays >= 6;
  }

  getDiffDate(c: any): number {
    const endDate: any = new Date(c.delivery_date);
    const iniDate: any = new Date();

    const diffTime = Math.abs(iniDate - endDate);
    const timeDay = 1000 * 60 * 60 * 24; // milesegundos * segundos * horas dia
    const diffDays = Math.ceil(diffTime / timeDay);

    return diffDays;
  }

  //Pesquisa
  searchs(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.cards = this.allCards.filter(
      (item: {
        title: string;
        tag: string;
        code: { toString: () => string | string[] };
        delivery_date: { toString: () => string | string[] };
      }) => {
        return (
          item.title!.toLowerCase().includes(value) ||
          item.tag!.toLowerCase().includes(value) ||
          item.code?.toString().includes(value) ||
          item.delivery_date?.toString().includes(value)
        );
      }
    );
  }

  async remove(id: any) {
    await this.cardServices.removeCard(id).subscribe();
    setTimeout(() => {
      this.cardServices.getCard().subscribe((item) => {
        const data = item.data;
        this.cards = data;
        this.totalP = data.length;
        this.snackBar.openSnackBar('Card excluído com sucesso!');
      });
    }, 600);
  }

  openDialogMember(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.activeModal.open(ViewCardComponent, {
      data: this.cardData,
      // width: '820px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  calculateDate() {
    this.cards.forEach((item: { delivery_date: string | number | Date }) => {
      const endDate: any = new Date(item.delivery_date);
      const iniDate: any = new Date();

      const diffTime = Math.abs(iniDate - endDate);
      const timeDay = 1000 * 60 * 60 * 24; // milesegundos * segundos * horas dia
      const diffDays = Math.ceil(diffTime / timeDay);

      console.log('datas', iniDate, endDate, diffDays);

      if (diffDays <= 2) {
        return 'data-color-red';
      }
      if (diffDays >= 3 && diffDays <= 5) {
        return 'data-color-orange';
      }
      return 'data-color-green';
    });
  }
}
