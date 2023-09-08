import { Component } from '@angular/core';

interface Componente{
  name: string;
  redirecTo: string;
  icon:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  componentes: Componente[]=[
    {
      name:'Inicio',
      redirecTo:'/home',
      icon:'home-outline'
    },
    {
      name:'Informacion',
      redirecTo:'/informacion',
      icon:'information-outline'
    },
    {
      name:'Cerrar sesion',
      redirecTo:'/login',
      icon:'exit-outline'
    },

  ]



  constructor() {}
}
