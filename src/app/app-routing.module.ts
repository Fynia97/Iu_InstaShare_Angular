import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookDisplayComponent } from './books/book-display/book-display.component';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: HomeComponent
  },
  {
    path: 'buecher', pathMatch: 'full', component: BookDisplayComponent
  },
  {
    path: 'buecher/neu', pathMatch: 'full', component: BookCreateComponent
  },
  {
    path: 'buecher/:id/bearbeiten', pathMatch: 'full', component: BookEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
