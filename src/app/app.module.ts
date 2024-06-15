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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDisplayComponent } from './users/user-display/user-display.component';
import { LendDisplayComponent } from './lends/lend-display/lend-display.component';
import { LendCreateComponent } from './lends/lend-create/lend-create.component';
import { LendEditComponent } from './lends/lend-edit/lend-edit.component';
import { BooleanPipe } from './costum/booleanPipe.pipe';
import { FriendDisplayComponent } from './friends/friend-display/friend-display.component';
import { FriendCreateComponent } from './friends/friend-create/friend-create.component';
import { RegisterComponent } from './register/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookCreateComponent,
    BookDisplayComponent,
    BookEditComponent,
    UserEditComponent,
    UserDisplayComponent,
    LendDisplayComponent,
    LendCreateComponent,
    LendEditComponent,
    BooleanPipe,
    FriendDisplayComponent,
    FriendCreateComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
