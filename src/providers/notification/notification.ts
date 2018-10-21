import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  constructor(public http: HttpClient, private alertCtrl:AlertController) {
    console.log('Hello NotificationProvider Provider');
  }
  
  alert(title:string,message:string){
      let instance = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: ['OK']
      })

      instance.present()
  }
}
