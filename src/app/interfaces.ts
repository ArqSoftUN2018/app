import { DateTime } from 'ionic-angular';

export class Tarea {
    public id:number
    public nombre:string
    public fecha_creacion:Date
    public fecha_vencimiento:Date
    public descripcion:string
    public activo:boolean
    public archivado:boolean
    public creador:number
    public lista_id:number
    public responsables:Usuario[] = []
  
    constructor(nombre,descripcion,fecha_creacion,fecha_vencimiento){
      this.nombre = nombre
      this.descripcion = descripcion
      this.fecha_creacion = fecha_creacion
      this.fecha_vencimiento = fecha_vencimiento
    }
}

export class Lista{
    public id:number
    public nombre:string
    public descripcion:string
    public tareas:Tarea[]
    public borrable:boolean = false
   
    constructor(nombre,descripcion){
        this.nombre = nombre
        this.descripcion = descripcion
        this.tareas = []
    }
}

export class Tablero {
    public id:number
    public nombre:string
    public descripcion:string
    public listas:Lista[]
    public usuarios:Usuario[] = []

    constructor(nombre,descripcion){
        this.nombre = nombre
        this.descripcion = descripcion
    }
}

export class Usuario {
    public id:number
    public nombre:string
    public apellido:string
    public usuario:string
    public email:string
}
