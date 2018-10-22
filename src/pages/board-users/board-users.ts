import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tablero, Usuario } from '../../app/interfaces'
import { NotificationProvider } from '../../providers/notification/notification';
/**
 * Generated class for the BoardUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-board-users',
  templateUrl: 'board-users.html',
})

export class BoardUsersPage {

  private busqueda:string
  private tablero:Tablero
  private busquedas:Usuario[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams,private notification:NotificationProvider) {
    this.tablero = this.navParams.get('tablero')
    console.log('Nuevo tablero')
    console.log(this.tablero)
    this.dummyFill()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoardUsersPage');
  }

  search(){
      this.buscarUsuario(this.busqueda)
  }

  addUser(usuario:Usuario){
    this.notification.confirmation('Esto añadira este usuario al tablero')
      .then(_=>{
        this.agregarUsuarios(usuario)
      })
  }

  removeUser(usuario:Usuario){
    this.notification.confirmation('Esto removera a este usuario')
      .then(_=>{
        this.removerUsuario(usuario)
      })
  }
  // funciones a sobreescribir
  dummyFill(){
    let usuario = new Usuario()
    usuario.nombre = "julian"
    usuario.email = "julian@test.com"
    usuario.id = 1

    this.busquedas.push(
      usuario
    )
  }

  private agregarUsuarios(usuario:Usuario){
    if(!usuario){
      this.notification.alert('Error','no se encontro ningun usuario')
      return
    }
    let found = this.tablero.usuarios.find((data)=>{
      return data.id == usuario.id
    })
    if(found){
      this.notification.alert('Error','Este usuario ha sido añadido anteriormente')
      return
    }
    this.tablero.usuarios.push(usuario)
    this.notification.alert('Exito','Se agrego exitosamente')
  }

  private removerUsuario(usuario:Usuario){
    if(!usuario){
      this.notification.alert('Error','no se encontro ningun usuario')
      return
    }
    let index = this.tablero.usuarios.indexOf(usuario)
    this.tablero.usuarios.splice(index,1)
    this.notification.alert('Exito','Usuario removido exitosamente')
  }

  private buscarUsuario(key:string){
    let este_user = new Usuario()
    este_user.nombre = key
    este_user.email = "test@test.com"
    este_user.id = this.busquedas.length + 1

    this.busquedas.push(
      este_user
    )
  }

}
