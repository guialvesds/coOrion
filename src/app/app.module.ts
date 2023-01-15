import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoHomeComponent } from './pages/info-home/info-home.component';
import { NewCardComponent } from './pages/new-card/new-card.component';
import { EditCardComponent } from './pages/edit-card/edit-card.component';
import { AlertComponent } from './components/alert/alert.component';
import { CardFormComponent } from './components/card-form/card-form.component';
import { ViewCardComponent } from './pages/view-card/view-card.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule} from '@angular/material/select'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberComponent } from './pages/view-card/member/member.component';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { AttachComponent } from './pages/view-card/attach/attach.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ListComponent } from './pages/view-card/list/list.component';
import { TaskComponent } from './pages/view-card/task/task.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    HomeComponent,
    InfoHomeComponent,
    NewCardComponent,
    EditCardComponent,
    AlertComponent,
    CardFormComponent,
    ViewCardComponent,
    MemberComponent,
    SnackBarComponent,
    AttachComponent,
    ListComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    BrowserAnimationsModule, 
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule, 
    MatExpansionModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  SnackBarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
