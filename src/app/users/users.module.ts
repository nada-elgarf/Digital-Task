import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateUpdateUserComponent } from './create-update-user/create-update-user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    UsersComponent,
    ListUsersComponent,
    UserProfileComponent,
    CreateUpdateUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatCardModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule
  ]
})
export class UsersModule { }
