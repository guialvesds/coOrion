import { Injectable } from '@angular/core';
import { CardService } from './card.service';
import { TaskService } from './task.service';



@Injectable({
  providedIn: 'root'
})
export class RequestApiInfoService {

  constructor(
    private card: CardService,
    private taskService: TaskService,
   
    ) { }

  getCard(id: string){
    this.card.findProducts(id).subscribe();
  }

  getList(id: string){
    this.taskService.getListService(id).subscribe();
  }
  
}
