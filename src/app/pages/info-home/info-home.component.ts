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
import { Token } from '@angular/compiler';

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

  userLoged!: any;

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
          data: card.data.map((c: any) => this.refDateColor(c)),
        }))
      )
      .subscribe({
        next: ({ data }) => {
          this.cards = data;
          this.allCards = data;
          this.totalP = data.length; 
          console.log(this.cards);
                 
        },
        error: (error) => {
          const dataError = error.statusText;
          if (dataError === 'Unauthorized') {
            this.route.navigate(['login']);
          }
        },
      });

    this.userServices.findUsers();
    this.getUserLoged();
  }

  public getUserLoged(){
    this.userLoged = window.sessionStorage.getItem('loged')

    console.log('Token home', this.userLoged);
  }

  refDateColor(c: any) {
    if (this.validRed(this.getDiffDate(c))) {
      c.color = 'red';
    }
    if (this.validOrange(this.getDiffDate(c))) {
      c.color = 'orange';
    } else if (this.validGreen(this.getDiffDate(c))) {
      c.color = 'green';
    }
    return c;
  }

  validRed(diffDays: number): boolean {
    return diffDays <= 2;
  }
  validOrange(diffDays: number): boolean {
    return diffDays >= 3 && diffDays <= 5;
  }
  validGreen(diffDays: number): boolean {
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
        description: { toString: () => string | string[] };
      }) => {
        return (
          item.title!.toLowerCase().includes(value) ||
          item.tag!.toLowerCase().includes(value) ||
          item.code?.toString().includes(value) ||
          item.delivery_date?.toString().includes(value) ||
          item.description?.toString().includes(value)
        );
      }
    );
  }

  remove(id: any) {
    this.cardServices.removeCard(id).subscribe();
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
      panelClass: 'infoUser-padding-dialof',
      data: this.cardData,
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: (res) => console.log(res)  
    });
  }
}
