import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateUpdateUserComponent } from './create-update-user/create-update-user.component';

const routes: Routes = [
  { path: 'listprofile', component: ListUsersComponent },
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'create', component: CreateUpdateUserComponent },
  { path: 'edit/:id', component: CreateUpdateUserComponent },
  { path: '**', redirectTo: 'users' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
