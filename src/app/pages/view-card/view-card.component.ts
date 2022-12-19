import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  faTimes,
  faFloppyDisk,
  faXmark,
  faPen,
  faRupiahSign,
  faArrowsRotate,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';

import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

import { CardService } from 'src/app/services/card.service';
import { UserService } from 'src/app/services/user.service';
import { Card } from 'src/app/model/Card';

import { ActivatedRoute, Router } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { Subscription } from 'rxjs';

import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';
import { AttachComponent } from './attach/attach.component';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css'],
})
export class ViewCardComponent implements OnInit, OnDestroy {
  @Input() cardData!: any;

  faTimes = faTimes;
  faFloppyDisk = faFloppyDisk;
  faArrowsRotate = faArrowsRotate;
  faXmark = faXmark;
  faPen = faPen;
  faTrashAlt = faTrashAlt;

  viewForm!: FormGroup;

  userData!: any;

  idUser!: string;

  comments!: any;

  nShowDesc: boolean = false;
  showComment: boolean = false;
  showTask: boolean = false;

  allFiles!: any;

  private subScriptions: Subscription[] = [];

  constructor(
    private snackBar: SnackBarComponent,
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
      description: new FormControl(
        this.cardData ? this.cardData.description : ''
      ),
      comment: new FormControl(''),
      commentText: new FormControl(),
      // userComments: new FormControl(this.cardData ? this.comments.text : ''),
    });
  }

  // Destroi as chamadas de subscribe
  ngOnDestroy(): void {
    this.subScriptions.forEach((item) => item.unsubscribe());
  }

  refresh() {
    this.getCard();
  }

  get description() {
    return this.viewForm.get('description')!;
  }

  getCard() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.cardServices.findProducts(id).subscribe((item) => {
      this.cardData = item.data;
      this.comments = this.cardData.comments;
      this.idUser = this.comments.userId;

      console.log(this.cardData.description);
    });
  }

  openDialogMember(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.activeModal.open(MemberComponent, {
      data: this.cardData,
      width: '420px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  openDialogAnexo(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.activeModal.open(AttachComponent, {
      data: this.cardData,
      width: '420px',
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

    await this.subScriptions.push(
      this.cardServices.editCard(id!, dados).subscribe()
    );
    this.snackBar.openSnackBar('Descrição adicionada com sucesso!');

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
    this.snackBar.openSnackBar('Comentário adicionado com sucesso!');

    setTimeout(() => {
      this.getCard();
    }, 500);

    this.nShowDesc = false;
    console.log('deu certo');
  }

  showDesc() {
    this.nShowDesc = true;
  }
  noShowDesc() {
    this.nShowDesc = false;
  }

  async deleteComment(idComment: any) {
    try {
      const idCard = this.cardData._id;

      const idC = idComment;

      console.log('commentário id', idComment);
      await this.cardServices.deleteComeentService(idCard, idC).subscribe(
        () => {
          this.snackBar.openSnackBar('Comentário removido com sucesso!');
        },
        (err) => {
          console.log(err);

          const message = err.error.message;
          this.snackBar.openSnackBar(message);
        }
      );

      setTimeout(() => {
        this.getCard();
      }, 500);
    } catch (error) {
      console.log('erro: ', error);
    }
  }

  openeditComment() {
    this.showComment = true;
  }

  unshoweditComment() {
    this.showComment = false;
  }

  async editComment(idComment: any) {
    try {
      const idCard = this.cardData._id;

      const idC = idComment;
      const textComemnt = this.viewForm.value;

      const dados = {
        comment: textComemnt.comment,
      };

      console.log(dados);

      await this.cardServices
        .editCommentService(idCard, idC, dados)
        .subscribe();

      setTimeout(() => {
        this.getCard();
      }, 500);
    } catch (error) {
      console.log('erro: ', error);
    }
  }

  deleteMember(idCard: any, idMember: any) {
    const cardId = idCard;
    const memberId = idMember;

    this.cardServices.deleteMember(cardId, memberId).subscribe();

    this.getCard();

    this.snackBar.openSnackBar('Membro Excluído com sucesso!');
  }

  verifyTask() {
    const dataT = this.cardData;
    for (let item of dataT) {
      if (item.tasks.lenght > 0) {
        return true;
      }
      return false;
    }
    return;
  }

  deleteArch(filen: string, idC: any, idF: any) {
    const filename = filen;

    const idCard = idC;
    const idFile = idF;

    this.cardServices.deleteArqAws(filename).subscribe();
    this.cardServices.deleteArqMongo(idCard, idFile).subscribe();

    this.getCard();

    this.snackBar.openSnackBar("Arquivo excluído com sucesso!");

    console.log(filename, idFile);
  }
}
