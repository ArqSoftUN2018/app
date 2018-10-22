import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Tarea, Lista, Tablero, Usuario } from '../../app/interfaces'
import { NotificationProvider } from '../../providers/notification/notification';
import { TaskPage } from '../task/task';
import { BoardUsersPage } from '../board-users/board-users';
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
class DropState{
  public lista:Lista
  public dropable:boolean = false
}

@IonicPage()
@Component({
  selector: 'page-board-details',
  templateUrl: 'board-details.html',
})
export class BoardDetailsPage {

  private tablero_id:number
  private tablero:Tablero
  private listas:Lista[] = []
  private dropStates:DropState[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams,private alert:AlertController,
      private alertCtrl:AlertController, private notification:NotificationProvider) {
    
    this.tablero_id = this.navParams.get('tablero_id')
    this.dummyFill()
  }
  
  showRadio(lista:Lista,tarea:Tarea) {
    let inputs:any[] = []
    let selected:boolean

    this.listas.forEach(list=>{
      if(list.id==lista.id){
        selected = true
      }
      inputs.push({
        type: "radio",
        label: list.nombre,
        value: {
            lista_anterior:lista,
            lista_nueva:list
        },
        checked: selected
      })
      selected = false
    })
    let alert = this.alertCtrl.create({
      title: "Lista actual",
      subTitle: 'Modificar lista correspondiente',
      inputs: inputs,
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Detalles Tarea',
          handler: () =>{
            this.navCtrl.push(TaskPage,{tablero: this.tablero,tarea: tarea})
          }
        },
        {
          text: 'Modificar',
          handler: (data) => {
            this.notification.confirmation('Esto cambiara la tarea de lista')
              .then(_=>{
                this.cambiarLista(data['lista_anterior'],data['lista_nueva'],tarea)
              })
          }
        }
      ]

    });
    alert.present();
  }

  changeDropState(lista:Lista){
    lista.borrable = ! lista.borrable
    //this.boardsStates[type].drop = ! this.boardsStates[type].drop
  }
  openUsers(){
    this.navCtrl.push(BoardUsersPage,{tablero: this.tablero})
  }
  addTask(lista:Lista){
    // Agregar nuevas versiones atravez de http

    let alert = this.alertCtrl.create({
      title: "Detalles",
      inputs:[
        {
          name:"nombre",
          placeholder:"nombre"
        },
        {
          type:'textarea',
          name:"descripcion",
          placeholder:"Descripcion"
        },
        {
          type: "date",
          name:"fecha_creacion",
          placeholder:"Fecha Inicial"
        },
        {
          type: "date",
          name:"fecha_vencimiento",
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
            this.notification.confirmation('Esto agregara una nueva tarea')
              .then(_=>{
                this.agregarTarea(lista,data)
              })
          }
        }
      ]

    });
    alert.present()
  }
  delete(lista:Lista,tarea:any){
    this.notification.confirmation('Esto eliminara esta tarea, no puede deshacerse')
      .then(_=>{
        this.destruirTarea(lista,tarea)
      })
  }

  addList(){
    let alert = this.alertCtrl.create({
      title: "Listas",
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
            this.notification.confirmation('Esto creara una nueva lista')
              .then(_=>{
                this.agregarLista(this.tablero_id,data)
              })
            // I NEED TO GET THE VALUE OF THE SELECTED RADIO BUTTON HERE
          }
        }
      ]

    });
    alert.present();
  }

  deleteList(lista:Lista){
    this.notification.confirmation('Esto removera definitivamente esta lista')
      .then(_=>{
        this.removerLista(lista)
      })
  }

  dummyFill(){

    this.tablero = new Tablero('Ejemplo','descripcion tablero')
    this.listas = []

    for(var i=0;i < 5;i++){
      let new_lista = new Lista('lista ' + i,'descripcion ' + i)
      new_lista.id = this.listas.length + 1
      this.listas.push(
        new_lista
      )
      // creacion de usuario
      let user = new Usuario()
      user.nombre = "usuario " + i
      user.email = "usuario_" + i + "@test.com"
      user.id = this.tablero.usuarios.length + 1
      this.tablero.usuarios.push(
        user
        )
    }
    console.log('Hola si')
    console.log(this.listas)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoardDetailsPage');
  }
  // Modificaciones de funciones al conectar
  private agregarLista(tablero_id:number,datos:any){
    let nueva_lista =  new Lista(datos['nombre'],datos['descripcion'])
    nueva_lista.id = this.listas.length + 1
    this.listas.push(
     nueva_lista
    )
  }
  private destruirTarea(lista:Lista,tarea:Tarea){
    let index = lista.tareas.indexOf(tarea)
    lista.tareas.splice(index,1)
    this.notification.alert('Exito','La tarea fue destruida exitosamente')
  }
  private cambiarLista(lista_anterior:Lista,lista_nueva:Lista,tarea){
    let index = lista_anterior.tareas.indexOf(tarea)
    lista_anterior.tareas.splice(index,1)
    lista_nueva.tareas.push(tarea)

    this.notification.alert('Exito','tarea modificada de lista')
  }
  private removerLista(lista:Lista){
    let index = this.listas.indexOf(lista)
    this.listas.splice(index,1)
  }
  private agregarTarea(lista:Lista,datos:any){
    let nueva_tarea = new Tarea(datos['nombre'],datos['descripcion'],datos['fecha_creacion'],datos['fecha_vencimiento'])
    nueva_tarea.id = lista.tareas.length + 1
    lista.tareas.push(
      nueva_tarea
    )
    console.log('Nueva tarea')
    console.log(nueva_tarea)
  }
}
