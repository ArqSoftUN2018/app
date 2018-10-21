import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the MemoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MemoryProvider {

  constructor(public http: HttpClient, private storage:Storage) {
    console.log('Hello MemoryProvider Provider');
  }

  get(key:string):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.storage.get(key)
        .then(value=>{
          resolve(value)
        })
    })
  }

  set(key:string,value:any):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.storage.set(key,value)
        .then(_=>{
          resolve()
        })
    })
  }

  private recursiveRead(index){
    
  }
}
