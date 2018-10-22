import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskUsersPage } from './task-users';

@NgModule({
  declarations: [
    TaskUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskUsersPage),
  ],
})
export class TaskUsersPageModule {}
