import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';

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
    private alert: AlertService,
    private snackBar: SnackBarComponent,
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.cardServices.findProducts(id).subscribe((item) => {
      this.cardData = item.data;

      // console.log(this.productData);
    });

    const codP = this.cardData.code;

    console.log(codP);
  }

   editP(cardtData: Card) {
    const id = this.cardData._id;

    const dados = {
      code: cardtData.code,
      title: cardtData.title,
      tag: cardtData.tag,  
      delivery_date: cardtData.delivery_date,
        
    };

    console.log("dados", dados);
    

    this.cardServices.editCard(id!, dados).subscribe();
    this.snackBar.openSnackBar(`Card ${this.cardData.code} alterado com sucesso!`);
    this.router.navigate(['/']);
  }
}
