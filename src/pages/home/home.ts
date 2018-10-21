import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BoardsPage } from '../boards/boards';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  
  boards(){
    this.navCtrl.push(BoardsPage)
  }

}
