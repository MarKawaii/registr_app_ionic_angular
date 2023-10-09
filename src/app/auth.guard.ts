import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FirebaseService } from './services/firebase.service';
import { AlertService } from './services/alert.service';  // Importa AlertService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private alertService: AlertService  // Inyecta AlertService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.firebaseService.user.pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        } else {
          // Redireccionar al login si el usuario no está autenticado
          this.alertService.presentAlert('Debe registrarse o iniciar sesión para acceder a esta sección.');
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
