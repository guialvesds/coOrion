import { Component, Input, OnInit, OnDestroy, Inject } from '@angular/core';
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

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AttachComponent } from './attach/attach.component';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';
import { ListComponent } from './list/list.component';
import { TaskService } from 'src/app/services/task.service';
import { Obj } from '@popperjs/core';
import { TaskComponent } from './task/task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { ViewImageComponent } from './view-image/view-image.component';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css'],
})
export class ViewCardComponent implements OnInit, OnDestroy {
  @Input() cardData!: Card | any;
  
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
  allTasks: any;

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

  ) {
    
  }

  ngOnInit(): void {
    this.refresh();

    this.viewForm = this.formBuild.group({
      description: new FormControl(
        this.cardData ? this.cardData.description : ''
      ),
      comment: new FormControl(''),
      commentText: new FormControl(),
      titleList: new FormControl(this.listData ? this.listData.title : ''),
      checkboxI: new FormControl()
    });       
    
  }

  // Destroi as chamadas de subscribe
  ngOnDestroy(): void {
    this.subScriptions.forEach((item) => item.unsubscribe());
  }

  refresh() {
    this.getCard();
    this.getList();   
  }

  get description() {
    return this.viewForm.get('description')!;
  }

  get title() {
    return this.viewForm.get('title')!;
  }

  getCard() {
    const id = String(this.route.snapshot.paramMap.get('id'));    
    this.cardServices.findProducts(id!).subscribe((item: { data: any; }) => {
      this.cardData = item.data;
      this.comments = this.cardData.comments;
      this.idUser = this.comments.userId;
      console.log(this.cardData);
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

  openDialogEditTask(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    task: [],
  ): void {
    this.activeModal.open(EditTaskComponent, {
      data: task,
      width: '620px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogEditList(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    list: [],
  ): void {
    this.activeModal.open(EditListComponent, {
      data: list,
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

  openDialogImage(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    image: string
  ): void {
    this.activeModal.open(ViewImageComponent, {
      data: image,
      width: 'auto',
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
      this.refresh();
    }, 500);
    this.nShowDesc = false;    
  }

  async addComments() {
    const id = this.cardData._id;

    const textComemnt = this.viewForm.value;

    const dados = {
      comment: textComemnt.comment,
    };

    await this.cardServices.addCommentService(id!, dados).subscribe();
    this.snackBar.openSnackBar('Comentário adicionado com sucesso!');

    this.viewForm.reset()
    setTimeout(() => {
      this.refresh();
    }, 500);

    this.nShowDesc = false;    
  }

  showDesc() {
    this.nShowDesc = true;
  }
  noShowDesc() {
    this.nShowDesc = false;
  }

   deleteComment(idComment: any) {
    try {
      const idCard = this.cardData._id;

      const idC = idComment;

      console.log('commentário id', idComment);
       this.cardServices.deleteComeentService(idCard, idC).subscribe(
        () => {
          this.snackBar.openSnackBar('Comentário removido com sucesso!');
        },
        (err) => {        

          const message = err.error.message;
          this.snackBar.openSnackBar(message);
        }
      );

      setTimeout(() => {
        this.refresh();
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

   editComment(idComment: any) {
    try {
      const idCard = this.cardData._id;

      const idC = idComment;
      const textComemnt = this.viewForm.value;

      const dados = {
        comment: textComemnt.comment,
      };

      console.log(dados);

      this.cardServices
        .editCommentService(idCard, idC, dados)
        .subscribe();

      setTimeout(() => {
        this.refresh();
      }, 500);
    } catch (error) {
      console.log('erro: ', error);
    }
  }

  deleteMember(idCard: any, idMember: any) {
    const cardId = idCard;
    const memberId = idMember;

    this.cardServices.deleteMember(cardId, memberId).subscribe();

    this.refresh();

    this.snackBar.openSnackBar('Membro Excluído com sucesso!');
  }

  deleteArch(filen: string, idC: any, idF: any) {
    const filename = filen;

    const idCard = idC;
    const idFile = idF;

    this.cardServices.deleteArqAws(filename).subscribe();
    this.cardServices.deleteArqMongo(idCard, idFile).subscribe();

    this.snackBar.openSnackBar('Arquivo excluído com sucesso!');
    this.refresh();
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
            this.allTasks = tasks.data;            
          });
        }
      });
      resolve();
    });
  }

  deleteList(id: string) {
    this.taskService.deleteListService(id).subscribe();
    this.refresh();
    this.snackBar.openSnackBar('Lista excluída com sucesso!');
  }

  showEList() {
    return (this.showEditList = true);
  }

  noShowEList() {
    return (this.showEditList = false);
  }
 

  // Tasks item

   removeTask(listId: string, taskId: string){

    this.taskService.removeTaskservice(listId, taskId).subscribe(
      () => {
        this.snackBar.openSnackBar('Tarefa removida com sucesso!');  
        this.getList();            
      },
      (err) => {
        console.log(err);        
      }
    );
   } 

   onTaskClick(task: Task){
    this.taskService.completeTaskService(task).subscribe(() => {      
      task.completed = !task.completed; 
    });  
   }
}
