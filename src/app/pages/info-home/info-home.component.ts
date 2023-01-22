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

@Component({
  selector: 'app-info-home',
  templateUrl: './info-home.component.html',
  styleUrls: ['./info-home.component.css'],
})
export class InfoHomeComponent implements OnInit {
  allCards: Card[] = [];
  cards!: Card[] | any;
  user: User[] = [];
  @Output() cardData!: Card;

  idCard!: Card;

  totalP!: number;
  search: string = '';

  editIcon = faPen;
  removeIcon = faXmark;
  vewIcon = faNoteSticky;

  dateDelivery!: any;

  constructor(
    private cardServices: CardService,
    private alert: AlertService,
    private userServices: UserService,
    private dialogService: MatDialog,
    private route: Router,
    public activeModal: MatDialog,
    private snackBar: SnackBarComponent,
  ) {}

  ngOnInit(): void {
    //inicializado a busca do produtos para exibilos no html
    this.cardServices.getCard().subscribe(
      (item) => {
        const data = item.data;

        this.cards = data;
        this.allCards = data;
        this.totalP = data.length;
        console.log(this.cards);
   
      },
      (error) => {
        const dataError = error.statusText;
        if (dataError === 'Unauthorized') {
          this.route.navigate(['login']);
        }
      }
    );

    this.userServices.findUsers();    
  }

  //Pesquisa
  searchs(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.cards = this.allCards.filter((item) => {
      return (
        item.title!.toLowerCase().includes(value) ||
        item.tag!.toLowerCase().includes(value) ||
        item.code?.toString().includes(value) ||
        item.delivery_date?.toString().includes(value)
      );
    });
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
}
