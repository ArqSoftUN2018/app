import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the BoardDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 /* ...... Tipos .......
  backlog
  to_do
  doing
 */

class Task {
  public name:string
  public description:string
  public type:string
  public initDate:DateTime
  public endDate:DateTime

  constructor(type,name,description,initDate,endDate){
    this.type = type
    this.name = name
    this.description = description
    this.initDate = initDate
    this.endDate = endDate
  }

}

@IonicPage()
@Component({
  selector: 'page-board-details',
  templateUrl: 'board-details.html',
})
export class BoardDetailsPage {
  private board:any 

  private boardsStates = {
    backlog: {
      name:"backlog",
      drop:false
    },
    to_do:{
      name:"To Do",
      drop: false
    },
    doing:{
      name:"Doing",
      drop: false
    }
  }

  private tasks:any = {
    backlog: [],
    toDoTask: [],
    doing: []
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,private alert:AlertController,
      private alertCtrl:AlertController) {
        console.log(this.boardsStates.backlog.drop)

    this.board = this.navParams.get('board')
    this.dummyFill()
  }
  
  showRadio(inputs:any[],) {
    let alert = this.alertCtrl.create({
      title: "Detalles",
      inputs:[
        {
          type: "radio",
          label:"planeado",
          value: '1',
          checked: true
        },
        {
          type: "radio",
          label:"planeado",
          value: '0',
          checked: false
        },
        {
          type: "radio",
          label:"planeado",
          value: '0',
          checked: false
        }
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

  changeDropState(type:string){
    this.boardsStates[type].drop = ! this.boardsStates[type].drop
  }
  addTask(type:string){
    // Agregar nuevas versiones atravez de http

    let alert = this.alertCtrl.create({
      title: "Detalles",
      inputs:[
        {
          name:"name",
          placeholder:"nombre"
        },
        {
          type:'textarea',
          name:"description",
          placeholder:"Descripcion"
        },
        {
          type: "date",
          name:"initDate",
          placeholder:"Fecha Inicial"
        },
        {
          type: "date",
          name:"endDate",
          placeholder:"Fecha Final"
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{

          }
        },
        {
          text: 'Agregar',
          handler: (data) => {
            console.log('OK clicked: ' );
            console.log(data)
            // I NEED TO GET THE VALUE OF THE SELECTED RADIO BUTTON HERE
          }
        }
      ]

    });

    alert.present()
    this.tasks[type].push(
      new Task('backlog',"planning " + 10,"des planning " + 10,Date.now(),Date.now())
    )
  }
  dummyFill(){
    for(var i=0;i < 5;i++){
      this.tasks.backlog.push(
        new Task('backlog',"planning " + i,"des planning " + i,Date.now(),Date.now())
      )
      this.tasks.toDoTask.push(
        new Task('to_do',"To do " + i,"to Do " + i,Date.now(),Date.now())
      )
      this.tasks.doing.push(
        new Task('doing',"Doing " + i,"Doing " + i,Date.now(),Date.now())
      )
    }
  }
  delete(task:any){
    alert('borrar')
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BoardDetailsPage');
  }

}
