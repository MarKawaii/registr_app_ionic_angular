import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model'; // Asegúrate de que esta ruta es correcta

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  user: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore // Inyecta AngularFirestore
  ) {
    this.user = this.afAuth.authState.pipe(
      map((firebaseUser) => {
        if (firebaseUser) {
          return {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || '',
            password: '', // Las contraseñas no son accesibles desde el estado de autenticación
            status: false, // Estado por defecto
            roleId: 1, // Rol por defecto (alumno)
          };
        } else {
          return null;
        }
      })
    );
  }

  signIn(user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  signUp(user: User) {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((credential) => {
        const newUser = {
          uid: credential.user.uid,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`, // Asume que User tiene firstName y lastName
          password: '', // Las contraseñas no son accesibles desde el estado de autenticación
          status: false, // Estado por defecto
          roleId: 1, // Rol por defecto (alumno)
        };
        // Actualiza el nombre de usuario en el perfil de Firebase
        return credential.user
          .updateProfile({ displayName: newUser.name })
          .then(() => {
            // Almacena los datos del usuario en Firestore
            return this.storeUserData(newUser);
          });
      })
      .catch((error) => {
        console.error('Error durante el registro:', error);
        throw error; // Re-lanza el error para que pueda ser manejado en el componente
      });
  }

  signOut() {
    return this.afAuth.signOut();
  }

  // Método para almacenar datos del usuario en Firestore
  storeUserData(user: User) {
    return this.afs.collection('users').doc(user.uid).set(user);
  }
}
