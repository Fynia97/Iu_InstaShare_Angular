import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookDisplayComponent } from './books/book-display/book-display.component';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDisplayComponent } from './users/user-display/user-display.component';
import { LendDisplayComponent } from './lends/lend-display/lend-display.component';
import { LendCreateComponent } from './lends/lend-create/lend-create.component';
import { LendEditComponent } from './lends/lend-edit/lend-edit.component';
import { FriendDisplayComponent } from './friends/friend-display/friend-display.component';
import { FriendCreateComponent } from './friends/friend-create/friend-create.component';
import { PrivacyComponent } from './footer/privacy/privacy.component';
import { ImpressumComponent } from './footer/impressum/impressum.component';
import { RegisterComponent } from './register/register/register.component';
import { RouteGuardGuard } from './login/route-guard.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: HomeComponent
  },
  {
    path: 'privacy', pathMatch: 'full', component: PrivacyComponent
  },  
  {
    path: 'impressum', pathMatch: 'full', component: ImpressumComponent
  },
  {
    path: 'register', pathMatch: 'full', component: RegisterComponent
  },
  {
    path: 'user/anzeigen', pathMatch: 'full', component: UserDisplayComponent, canActivate: [RouteGuardGuard]
  },
  {
    path: 'user/bearbeiten', pathMatch: 'full', component: UserEditComponent, canActivate: [RouteGuardGuard]
  },
  {
    path: 'buecher', pathMatch: 'full', component: BookDisplayComponent, canActivate: [RouteGuardGuard]
  },
  {
    path: 'buecher/erstellen', pathMatch: 'full', component: BookCreateComponent, canActivate: [RouteGuardGuard]
  },
  {
    path: 'buecher/:id/bearbeiten', pathMatch: 'full', component: BookEditComponent, canActivate: [RouteGuardGuard]
  },
  {
    path: 'ausleihe', pathMatch: 'full', component: LendDisplayComponent, canActivate: [RouteGuardGuard]
  },
  {
    path: 'ausleihe/erstellen', pathMatch: 'full', component: LendCreateComponent, canActivate: [RouteGuardGuard]
  },
  {
    path: 'ausleihe/:id/bearbeiten', pathMatch: 'full', component: LendEditComponent, canActivate: [RouteGuardGuard]
  },
  {
    path: 'freunde', pathMatch: 'full', component: FriendDisplayComponent, canActivate: [RouteGuardGuard]
  },
  {
    path: 'freunde/finden', pathMatch: 'full', component: FriendCreateComponent, canActivate: [RouteGuardGuard]
  },
  {
    path: 'deletedAccount', pathMatch: 'full', component: AppComponent, canActivate: [RouteGuardGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
