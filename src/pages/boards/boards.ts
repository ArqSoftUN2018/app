import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BoardDetailsPage } from '../board-details/board-details';

/**
 * Generated class for the BoardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boards',
  templateUrl: 'boards.html',
})
export class BoardsPage {
  private boards = [{
      "name":"board",
      "description":"test2"    
  },
  {   
      "name":"board",
      "description":"test2"    
  },
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoardsPage');
  }
  
  details(board:any){
    this.navCtrl.push(BoardDetailsPage,{board: board})
  }

  addBoard(){
    let alert = this.alertCtrl.create({
      title: "Detalles",
      inputs:[
        {
          name:"name",
          placeholder:"Nombre"
        },
        {
          type:'textarea',
          name:"description",
          placeholder:"Descripcion"
        },
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{

          }
        },
        {
          text: 'OK',
          handler: (data) => {
            console.log('OK clicked: ' );
            console.log(data)
            // I NEED TO GET THE VALUE OF THE SELECTED RADIO BUTTON HERE
          }
        }
      ]

    });
    alert.present();
  }

}
