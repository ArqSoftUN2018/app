import { RequestOptions, Headers, Response, Http } from '@angular/http'

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { MemoryProvider } from '../memory/memory'
import { NotificationProvider } from '../notification/notification';
import { Events } from 'ionic-angular'

/*
  Generated class for the ConnectorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectorProvider {

  constructor(private http: Http, private memory:MemoryProvider, private notification:NotificationProvider,
      private events:Events) {
    console.log('Hello ConnectorProvider Provider');
  }


   signed(type:string,address:string,body:any){
    return new Promise((resolve,reject)=>{
        this.memory.get('token')
          .then(token=>{
            if(!token){
              this.notification.alert('Error','El usuario debe autenticarse')
              this.events.publish('user:unauthorized')
              return
            }
            let headers = new Headers()
            headers.append('Authorization',token)

            this.makeCall(type,headers,address,body)
              .subscribe(data=>{
                resolve(data.json())
              },error=>{
                this.notification.alert('Error',error.message)
              })
          })

    })
  }

  unsigned(type:string,address:string,body:any){
    return new Promise((resolve,reject)=>{
      this.makeCall(type,null,address,body)
              .subscribe(data=>{
                resolve(data.json())
              },error=>{
                this.notification.alert('Error',error.message)
              })
    })
  }

  private makeCall(type:string,header:Headers,address:string,body:any): Observable<Response>{
    let current_head = header
    if(!header){current_head = new Headers()}
    current_head.append('Content-Type','application/json')
    
    let options = new RequestOptions({headers: current_head})

    switch(type){
        case 'get':
            return this.http.get(address,options)
        case 'post':
            return this.http.post(address,body,options)
        case 'put':
            return this.http.put(address,body,options)
        case 'delete':
            return this.http.delete(address,options)
        default:
            console.log("Error en MAKE CALL connector")
            console.log("Tipo de llamada incorrecta")
        }
}

}
