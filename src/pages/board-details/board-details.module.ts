import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoardDetailsPage } from './board-details';

@NgModule({
  declarations: [
    BoardDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BoardDetailsPage),
  ],
})
export class BoardDetailsPageModule {}
