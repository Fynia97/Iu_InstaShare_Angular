import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { BookDisplayComponent } from './books/book-display/book-display.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookCreateComponent,
    BookDisplayComponent,
    BookEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
