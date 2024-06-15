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

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: HomeComponent
  },
  {
    path: 'user/:id/anzeigen', pathMatch: 'full', component: UserDisplayComponent
  },
  {
    path: 'user/:id/bearbeiten', pathMatch: 'full', component: UserEditComponent
  },
  {
    path: 'buecher', pathMatch: 'full', component: BookDisplayComponent
  },
  {
    path: 'buecher/erstellen', pathMatch: 'full', component: BookCreateComponent
  },
  {
    path: 'buecher/:id/bearbeiten', pathMatch: 'full', component: BookEditComponent
  },
  {
    path: 'ausleihe', pathMatch: 'full', component: LendDisplayComponent
  },
  {
    path: 'ausleihe/erstellen', pathMatch: 'full', component: LendCreateComponent
  },
  {
    path: 'ausleihe/:id/bearbeiten', pathMatch: 'full', component: LendEditComponent
  },
  {
    path: 'freunde', pathMatch: 'full', component: FriendDisplayComponent
  },
  {
    path: 'freunde/finden', pathMatch: 'full', component: FriendCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
