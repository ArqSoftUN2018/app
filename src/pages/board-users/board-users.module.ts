import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoardUsersPage } from './board-users';

@NgModule({
  declarations: [
    BoardUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(BoardUsersPage),
  ],
})
export class BoardUsersPageModule {}
