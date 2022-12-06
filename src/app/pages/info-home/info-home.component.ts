import { Component, OnInit, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { CardService } from "src/app/services/card.service";
import { AlertService } from "src/app/services/alert.service";
import { UserService } from "src/app/services/user.service";

import { User } from "src/app/model/User";
import { Card } from "src/app/model/Card";

import {
  faPen,
  faXmark,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-info-home',
  templateUrl: './info-home.component.html',
  styleUrls: ['./info-home.component.css']
})
export class  InfoHomeComponent implements OnInit {
  allCards: Card[] = [];
  cards: Card[] = [];
  user: User[] = [];
  @Output() cardData!: Card;

  idCard!: Card;

  totalP!: number;
  search: any = "";

  editIcon = faPen;
  removeIcon = faXmark;
  vewIcon = faNoteSticky;

  constructor(
    private cardServices: CardService,
    private alert: AlertService,    
    private userServices: UserService,
    private dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    //inicializado a busca do produtos para exibilos no html
    this.cardServices.getCard().subscribe((item) => {
      const data = item.data;

      this.cards = data;
      this.allCards = data;
      this.totalP = data.length;
      console.log(data);
    });    
    
    this.userServices.getUsers();
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

    console.log("Card excluído com sucesso!");

    setTimeout(() => {
      this.cardServices.getCard().subscribe((item) => {
        const data = item.data;
        this.cards = data;
        this.totalP = data.length;

        this.alert.add("Card excluído com sucesso!");
      });
    }, 600);
  }

  // async openDialog(id: any) {
  //   const dialogRef = this.dialogService.open(ViewComponent, {
  //     width: '40rem',
  //     data: { data: this.cards}
  //   });   

  //   dialogRef.afterClosed().subscribe();
  // }
}

