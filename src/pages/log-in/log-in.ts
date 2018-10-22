import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ConnectorProvider } from '../../providers/connector/connector';
import { GlobalVar } from '../../app/global-var'
import { NotificationProvider } from '../../providers/notification/notification';
import { MemoryProvider } from '../../providers/memory/memory';
/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {
  private userData:any ={
    email:"",
    password:""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,private connector:ConnectorProvider,
      private notification:NotificationProvider, private memory:MemoryProvider, private events:Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }

  logIn(){
    let user_format = {
      user: {
        auth: this.userData.email,
        password: this.userData.password
      }
    }
    this.notification.loaderPresent()

    this.connector.unsigned('post',GlobalVar.logIn,user_format)
      .then(data=>{
          this.memory.set('token',data['token'])
            .then(_=>{
              this.notification.alert('Exito','El usuario ha ingresado exitosamente')
              this.events.publish('home')
            })
          this.notification.loaderHide()
      })
      .catch(error=>{
        this.notification.loaderHide()
        this.notification.alert('Error','Usuario o contraseña incorrecta')
      })
  }

}
