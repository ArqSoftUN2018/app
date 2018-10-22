import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {
  private loadingTime:number = 30000
  private loader:any = null
  constructor(private alertCtrl:AlertController,private loadingCtrl:LoadingController) {
    console.log('Hello NotificationProvider Provider');
  }
  
  alert(title:string,message:string){
      let instance = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: ['OK'],
        cssClass: 'alert-style'
      })

      instance.present()
  }

  loaderPresent(){
    this.loader = this.loadingCtrl.create({
      content: 'Espere un momento por favor',
      duration: this.loadingTime
    })
    this.loader.present()
  }
  confirmation(message:string){
    return new Promise((resolve,reject)=>{
      let instance = this.alertCtrl.create({
        title: "Confirmacion",
        subTitle: "Esta seguro/a ?",
        message: message,
        buttons:[
          {
            text: 'No',
            role: 'cancel',
            handler: () =>{
              
            }
          },
          {
            text: 'Si',
            handler: (data) => {
              resolve()
            }
          }
        ]
      })
      instance.present()
    })
  }

  loaderHide(){
    if(! this.loader){
      return
    }
    this.loader.dismiss()
      .then(_=>{
        this.loader = null
      })
  }
}
