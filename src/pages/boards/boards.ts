import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BoardDetailsPage } from '../board-details/board-details';
import { Tablero } from '../../app/interfaces';
import { NotificationProvider } from '../../providers/notification/notification';

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
  private tableros:Tablero[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController,private notification:NotificationProvider) {
  }
  ionViewWillEnter(){
    this.fillBoards()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BoardsPage');
  }
  
  details(id:number){
    this.navCtrl.push(BoardDetailsPage,{tablero_id: id})
  }

  addBoard(){
    let alert = this.alertCtrl.create({
      title: "Detalles",
      inputs:[
        {
          name:"nombre",
          placeholder:"Nombre"
        },
        {
          type:'textarea',
          name:"descripcion",
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
            this.notification.confirmation('Esto creara un nuevo tablero')
              .then(_=>{
                this.createBoard(data)
              })
            // I NEED TO GET THE VALUE OF THE SELECTED RADIO BUTTON HERE
          }
        }
      ]

    });
    alert.present();
  }


  // archivos a modificar ................
  private createBoard(data){
    // socreescribir con llamadas
    this.tableros.push(
      new Tablero(data['nombre'],data['descripcion'])
    )
    this.notification.alert('Exito','Tablero creado exitosamente')
  }

  private fillBoards(){
    for(var i=0;i<3;i++){
      this.tableros.push(
        new Tablero('Tablero ' + i,'tablero ' + i)
      )
    }
  }

}
