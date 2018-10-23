import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Tarea, Usuario, Tablero } from '../../app/interfaces'
import { NotificationProvider } from '../../providers/notification/notification';
import Moment from 'moment'

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  private tarea:Tarea
  private tablero:Tablero
  private fecha_creacion:string
  private fecha_vencimiento:string

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private notification:NotificationProvider,private alertCtrl:AlertController) {
    //this.tarea = this.navParams.get('tarea')
    this.tarea = new Tarea('tarea 1','tarea 1',new Date(),new Date())
    this.tablero = this.navParams.get('tablero')
    
    this.fecha_creacion = this.tarea.fecha_creacion.getDay() + '-' + ( this.tarea.fecha_creacion.getMonth() + 1 ) + '-' + this.tarea.fecha_creacion.getFullYear()
    this.fecha_vencimiento = this.tarea.fecha_creacion.getDay() + '-' + ( this.tarea.fecha_vencimiento.getMonth() + 1 ) + '-' + this.tarea.fecha_vencimiento.getFullYear()

    console.log('Task Page')
    console.log(this.fecha_creacion)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }
  dropUser(usuario:Usuario){
    this.notification.confirmation('Esto removera este usuario de esta tarea')
      .then(_=>{
        this.quitarUsuario(usuario)
      })
  }
  addUser(){
    let inputs:any[] = []
    let selected:boolean = false
    let search_task

    this.tablero.usuarios.forEach(usr=>{
      search_task = this.tarea.responsables.find((data)=>{
        return data.id == usr.id
      })
      if(search_task){selected=true}
      inputs.push({
        type: "checkbox",
        label: usr.nombre,
        value: usr,
        checked: selected
      })
      selected = false
    })
    let alert = this.alertCtrl.create({
      title: "Usuarios",
      subTitle: 'Modificar usuarios de esta tarea',
      inputs: inputs,
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.notification.confirmation('Esto vinculara este usuario con esta tarea.')
              .then(_=>{
                this.vincularUsuario(data)
              })
          }
        }
      ]

    });
    alert.present();
  }

  /// Modificacion propia de funciones{
  private dummyFill(){
    for(var i=0;i<6;i++){
      let user = new Usuario()
      user.nombre = "usuario " + i
      user.email = "usuario_" + i + "@test.com"
      user.id = this.tarea.responsables.length + 1
      this.tarea.responsables.push(
        user
        )
    }
  }
  private quitarUsuario(usuario:Usuario){
    console.log('Current usuario')
    console.log(usuario)
    let index = this.tarea.responsables.indexOf(usuario)
    console.log('index')
    console.log(index)
    this.tarea.responsables.splice(index,1)
    this.notification.alert('Exito','Usuario removido exitosamente')
  }
  private vincularUsuario(usuarios:Usuario[]){

    delete this.tarea.responsables
    this.tarea.responsables = []
    usuarios.forEach(data=>{
      this.tarea.responsables.push(data)
    })
    console.log('Responsables')
    console.log(this.tarea.responsables)
  }

}
