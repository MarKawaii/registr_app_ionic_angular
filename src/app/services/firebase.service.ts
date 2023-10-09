import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';  // Asegúrate de que esta ruta es correcta

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  user: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState.pipe(
      map(firebaseUser => {
        if (firebaseUser) {
          // Si el usuario está autenticado, crea un objeto User
          return {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || '',
            password: ''  // Las contraseñas no son accesibles desde el estado de autenticación
          };
        } else {
          // Si no está autenticado, devuelve null
          return null;
        }
      })
    );
  }

  signIn(user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  signUp(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(credential => {
        // Actualiza el nombre de usuario en el perfil de Firebase
        return credential.user?.updateProfile({ displayName: user.name });
      });
  }

  signOut() {
    return this.afAuth.signOut();
  }
}
