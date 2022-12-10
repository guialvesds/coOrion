import { Component, Input, OnInit } from '@angular/core';
import {
  faTimes,
  faFloppyDisk,
  faXmark,
  faPen,
  faRupiahSign,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';

import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

import { CardService } from 'src/app/services/card.service';
import { UserService } from 'src/app/services/user.service';
import { Card } from 'src/app/model/Card';

import { ActivatedRoute, Router } from '@angular/router';
import { MemberComponent } from './member/member.component';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css'],
})
export class ViewCardComponent implements OnInit {
  @Input() cardData!: Card;

  faTimes = faTimes;
  faFloppyDisk = faFloppyDisk;
  faXmark = faXmark;
  faPen = faPen;

  viewForm!: FormGroup;

  userData!: any;

  idUser!: string;

  comments!: any;

  nShowDesc: boolean = false;

  constructor(
    private cardServices: CardService,
    private userServices: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public activeModal: MatDialog,
    private formBuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCard();

    this.viewForm = this.formBuild.group({
      description: new FormControl(''),
      comment: new FormControl(''),
      commentText: new FormControl(''),
      // userComments: new FormControl(this.cardData ? this.comments.text : ''),
    });

  }

  get description() {
    return this.viewForm.get('description')!;
  }

  async getCard() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    await this.cardServices.getP(id!).subscribe((item) => {
      this.cardData = item.data;
      this.comments = this.cardData.comments;
      this.idUser = this.comments.userId;
      console.log('CardData', this.cardData.comments);
     });
  }


  openDialogMember(enterAnimationDuration: string, exitAnimationDuration: string): void{
    this.activeModal.open(MemberComponent, {
      data: {data: this.cardData},
      width: "420px",
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  async putDescription() {
    const id = this.cardData._id;
    const desc = this.viewForm.value;

    const dados = {
      description: desc.description,
    };
    await this.cardServices.editCard(id!, dados).subscribe();

    setTimeout(() => {
      this.getCard();
    }, 500);
    this.nShowDesc = false;
    console.log('deu certo');
  }

  async addComments() {
    const id = this.cardData._id;

    const textComemnt = this.viewForm.value;

    const dados = {
      comment: textComemnt.comment,
    };

    await this.cardServices.addCommentService(id!, dados).subscribe();

    setTimeout(() => {
      this.getCard();
    }, 500);

    this.nShowDesc = false;
    console.log('deu certo');
  }

  showDesc() {
    this.nShowDesc = true;
    const desc = this.viewForm.value;
    return (desc.description = this.cardData.description);
  }
  noShowDesc() {
    this.nShowDesc = false;
  }

  async deleteComment(idComment: any) {
    try {
      const idCard = this.cardData._id;

      const idC = idComment;

      console.log('commentário id', idComment);
      await this.cardServices.deleteComeentService(idCard, idC).subscribe();

      setTimeout(() => {
        this.getCard();
      }, 500);
    } catch (error) {
      console.log('erro: ', error);
    }
  }

  async editComment(idComment: any){
    try {
      const idCard = this.cardData._id;

      const idC = idComment;
      const textComemnt = this.viewForm.value;

      const dados = {
        comment: textComemnt.comment,
      };

    
      await this.cardServices.editCommentService(idCard, idC, dados).subscribe();

      setTimeout(() => {
        this.getCard();
      }, 500);
    } catch (error) {
      console.log('erro: ', error);
    }
  }
}
