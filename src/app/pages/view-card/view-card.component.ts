import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  faTimes,
  faFloppyDisk,
  faXmark,
  faPen,
  faRupiahSign,
  faArrowsRotate,
  faTrashAlt,
  faPlus,
  faCalendar,
  faUser,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';

import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

import { CardService } from 'src/app/services/card.service';
import { UserService } from 'src/app/services/user.service';
import { Card } from 'src/app/model/Card';
import { Task } from 'src/app/model/tasks';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { Subscription } from 'rxjs';

import { AttachComponent } from './attach/attach.component';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';
import { ListComponent } from './list/list.component';
import { TaskService } from 'src/app/services/task.service';
import { Obj } from '@popperjs/core';
import { TaskComponent } from './task/task.component';

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
  faPlus = faPlus;
  faClock = faClock;
  faUser = faUser;

  viewForm!: FormGroup;

  userData!: any;

  idUser!: string;

  comments!: any;

  nShowDesc: boolean = false;
  showComment: boolean = false;
  showEditList: boolean = false;
  showTask: boolean = false;

  allFiles!: any;

  typesOfShoes: string[] = ['Boots'];

  listData!: any;
  tasks: any = {};  

  private subScriptions: Subscription[] = [];

  constructor(
    private taskService: TaskService,
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
      titleList: new FormControl(this.listData ? this.listData.title : ''),
      // userComments: new FormControl(this.cardData ? this.comments.text : ''),
    });

    this.getList().then(() => {
      // this.getTasks();
    });
  }

  // Destroi as chamadas de subscribe
  ngOnDestroy(): void {
    this.subScriptions.forEach((item) => item.unsubscribe());
  }

  refresh() {
    this.getCard();
    this.getList();
    // this.getTasks();
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

  openDialogList(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.activeModal.open(ListComponent, {
      data: this.cardData,
      width: '420px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogTask(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    listId: string
  ): void {
    this.activeModal.open(TaskComponent, {
      data: listId,
      width: '620px',
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

  deleteArch(filen: string, idC: any, idF: any) {
    const filename = filen;

    const idCard = idC;
    const idFile = idF;

    this.cardServices.deleteArqAws(filename).subscribe();
    this.cardServices.deleteArqMongo(idCard, idFile).subscribe();

    this.snackBar.openSnackBar('Arquivo excluído com sucesso!');
    this.getCard();
  }

  // Tasks

  // List-Task

  getList() {
    return new Promise<void>((resolve, reject) => {
      const id = String(this.route.snapshot.paramMap.get('id'));
      this.taskService.getListService(id!).subscribe((item) => {
        this.listData = item.data;

        // Get Tasks

        const lists = this.listData; 
      
        for (let i of lists) {

          const listId = i._id;

          console.log('for', listId);        

          this.taskService.getTasksService(listId).subscribe((tasks) => {
            this.tasks[listId] = tasks.data;

            console.log('get tasks', tasks.data);
          });
        }
        console.log('log for',this.tasks);
      });
      resolve();
    });
  }

  deleteList(id: string) {
    this.taskService.deleteListService(id).subscribe();
    this.getList();
    this.snackBar.openSnackBar('Lista excluída com sucesso!');
  }

  showEList() {
    return (this.showEditList = true);
  }

  noShowEList() {
    return (this.showEditList = false);
  }

  editLists(_id: string) {
    const titleList = this.viewForm.value;
    const dados = {
      title: titleList.titleList,
    };
    this.taskService.editListService(_id, dados).subscribe();
    this.snackBar.openSnackBar('Título alterado com sucesso!');
    this.showEditList = false;
    this.getList();
  }

  // Tasks item

  // async getTasks() {
  //   const lists = this.listData;

  //   console.log('lists', lists);

  //   for (let i: any = 0; i < lists.length; i++) {
  //     const listId = lists[i]._id;

  //     console.log('for', listId);
  //     console.log('for', lists);

  //     await this.taskService.getTasksService(listId).subscribe((item) => {
  //       this.tasks = item.data;
  //     });
  //   }
  //   console.log(this.tasks);
  // }
}
