import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Card } from 'src/app/model/Card';
import { AlertService } from 'src/app/services/alert.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {

  cardData!: Card;
  btnText = 'Editar';
  title = 'Editar Cartão';

  constructor(
    private router: Router,
    private cardServices: CardService,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.cardServices.getP(id).subscribe((item) => {
      this.cardData = item.data;

      // console.log(this.productData);
    });

    const codP = this.cardData.code;

    console.log('Editando o produto', codP);
  }

   editP(cardtData: Card) {
    const id = this.cardData._id;

    const dados = {
      code: cardtData.code,
      name: cardtData.title,
      tag: cardtData.tag,  
      delivery_date: cardtData.delivery_date,
        
    };

    console.log("dados", dados);
    

    this.cardServices.editCard(id!, dados).subscribe();
    this.alert.add(`produto ${this.cardData.code} alterado com sucesso!`);
    this.router.navigate(['/']);
  }
}
