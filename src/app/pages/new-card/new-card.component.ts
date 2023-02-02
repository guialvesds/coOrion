import { Component, OnInit } from '@angular/core';
import { ɵinitDomAdapter } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

import { Card } from 'src/app/model/Card';
import { AlertService } from 'src/app/services/alert.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css'],
})
export class NewCardComponent implements OnInit {
  btnText = 'Cadastrar';

  title = 'Novo Cartão';

  constructor(
    private router: Router,
    private cardServices: CardService,
    private alert: AlertService,
    private snackBAr: SnackBarComponent
  ) {}

  ngOnInit(): void {}

  createCard(data: Card) {
    const codRandon: number = 9999;

    try {
      const dados = {
        code: Math.floor(Math.random() * codRandon),
        title: data.title,
        tag: data.tag,
        delivery_date: data.delivery_date,
      };

      if (data.title) {
        this.cardServices.createCard(dados).subscribe();

        this.snackBAr.openSnackBar('Card cadastrado com sucesso!');

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      } else {
        this.alert.add('Campos title é obrigatórios!');
      }
    } catch (error) {
      this.alert.add('Error ao cadastrar Card!');
    }
  }
}
