import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private afAuth: AngularFireAuth) { }  // Inyectando AngularFireAuth

  // Autenticación
  signIn(user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password); 
  }

  // Crear Usuario
  signUp(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  async updateUser(displayName: string) {
    const user = await this.afAuth.currentUser;
    if(user){
       return user.updateProfile({displayName});
    }
    throw new Error('No user is signed in.');
  }
}
