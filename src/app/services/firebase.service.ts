import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private afAuth: AngularFireAuth) { }  // Inyectando AngularFireAuth

  // Autenticacion
  singIn(user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password); // <-- Corrección aquí
  }
}
