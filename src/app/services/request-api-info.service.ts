import { Injectable } from '@angular/core';
import { CardService } from './card.service';


@Injectable({
  providedIn: 'root'
})
export class RequestApiInfoService {

  constructor(private card: CardService) { }

  getCard(id: string){
    this.card.findProducts(id).subscribe();
  }
}
