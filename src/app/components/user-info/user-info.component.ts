import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from 'src/app/pages/home/home.component';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  public userData: any;
  public faXmark = faXmark;
  public avatarUser: String = '';
  public keyAvatar!: string;
  public nameArquivo!: string;

  file!: File;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {},
    private dialoRef: MatDialogRef<HomeComponent>,
    private userService: UserService,
    private snackBar: SnackBarComponent,
  ) {}

  ngOnInit(): void {
    this.fillData();
  }

  closeDialog() {
    this.dialoRef.close();
  }

  uploadAvatar(e: Event, userId: string, fileName: string) {
    if (!e?.target) {
      return;
    }

    const target = e?.target! as any;
    this.file = target.files[0];

    if (this.file) {
      const dados = new FormData();
      dados.append('uploads', this.file);

      this.userService
        .uploadAvatarService(userId, fileName, dados)
        .pipe()
        .subscribe({
          next: () => {
            this.snackBar.openSnackBar('Foto atualizada com sucesso!');
            setTimeout(() => {
              window.location.reload();          
            }, 2000);
          },
          error: (err) => {
            console.error(err);
          },
        });}
  }

  getAvatar(): string {
    const dadosUser = this.userData.avatar[0].detail.location;
    this.keyAvatar = this.userData.avatar[0].detail.key;
    return (this.avatarUser = dadosUser);
  }

  fillData() {
    this.userData = this.data;
    this.getAvatar();
  }
}
