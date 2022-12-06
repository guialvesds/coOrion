import { Component, OnInit } from '@angular/core';
import { ɵinitDomAdapter } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Card } from 'src/app/model/Card';
import { AlertService } from 'src/app/services/alert.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent implements OnInit {

  btnText = 'Cadastrar';

  title = 'Novo Cartão';

  constructor(
    private router: Router,
    private cardServices: CardService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {}

  async createCard(data: Card) {
    
    const codRandon: number =  9999;
  
    console.log("value da lista", data.tag);
    
    try {
      const dados = {
        code:  Math.floor(Math.random() * codRandon),
        title: data.title,
        tag: data.tag, 
        delivery_date: data.delivery_date,
      };

      if (data.code && data.title) {
        await this.cardServices.createCard(dados).subscribe();

        this.alert.add('Card cadastrado com sucesso!');

        console.log("dados data de entrega", dados.delivery_date);
        

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);

        console.log('Card cadastrado com sucesso!');
      } else {
        this.alert.add('Campos de title é obrigatórios!');
      }
    } catch (error) {
      this.alert.add('Error ao cadastrar Card!');

      console.log('Erro ao cadastrar Card.', error);
    }
  }
}

