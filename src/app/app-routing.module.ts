import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { EditCardComponent } from './pages/edit-card/edit-card.component';
import { InfoHomeComponent } from './pages/info-home/info-home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewCardComponent } from './pages/new-card/new-card.component';
import { ViewCardComponent } from './pages/view-card/view-card.component';
import { AuthGuard } from "./guards/auth.guard";
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'account', component: CreateAccountComponent },

  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: InfoHomeComponent },
      { path: 'newCard', component: NewCardComponent },
      { path: 'card/edit/:id', component: EditCardComponent },
      { path: 'card/view/:id', component: ViewCardComponent },
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
