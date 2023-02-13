import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoComponent } from 'src/app/components/user-info/user-info.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  userLoged!: any;
  
  constructor(private router: Router, private userService: UserService, private activeModal: MatDialog) {}

  ngOnInit(): void {
    this.getUserLoged();
  }

  sair() {
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('loged');
    this.router.navigate(['/login']);
  }

  openDialogMember(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.activeModal
      .open(UserInfoComponent, {
        data: this.userLoged,
        width: '420px',
        enterAnimationDuration,
        exitAnimationDuration,
      })
      .afterClosed()
      .subscribe({
        next: (res) => console.log(res),
      });
  }

  getUserLoged(){
    const storage = sessionStorage.getItem('loged');

    this.userService.getUserId(storage).subscribe(
      {
        next: (data) => {
            this.userLoged = data.user;  
        },
        error: (err) => {
          console.error(err);          
        }
      }
    );
  }
}
