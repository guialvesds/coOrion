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

  productData!: Card;
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
      this.productData = item.data;

      // console.log(this.productData);
    });

    const codP = this.productData.code;

    console.log('Editando o produto', codP);
  }

   editP(productData: Card) {
    const id = this.productData.id;

    const dados = {
      code: productData.code,
      name: productData.title,
      list: productData.list,  
      delivery_date: productData.delivery_date    
    };

    this.cardServices.editCard(id!, dados).subscribe();
    this.alert.add(`produto ${this.productData.code} alterado com sucesso!`);
    this.router.navigate(['/']);
  }
}
