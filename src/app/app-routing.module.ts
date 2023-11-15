import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';  // Importar AuthGuard

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]  // Aplicar AuthGuard
  },
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then( m => m.InformacionPageModule),
    canActivate: [AuthGuard]  // Aplicar AuthGuard
  },
  {
    path: 'user-management',
    loadChildren: () => import('./pages/user-management/user-management.module').then( m => m.UserManagementPageModule)
  },  {
    path: 'asignatura',
    loadChildren: () => import('./pages/asignatura/asignatura.module').then( m => m.AsignaturaPageModule)
  },
  {
    path: 'ver-asignaturas',
    loadChildren: () => import('./pages/ver-asignaturas/ver-asignaturas.module').then( m => m.VerAsignaturasPageModule)
  },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
