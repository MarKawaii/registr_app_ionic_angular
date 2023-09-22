import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: AngularFirestore) { }

  createUser(user: any) {
    return this.firestore.collection('users').add(user);
  }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  updateUser(id: string, user: any) {
    return this.firestore.collection('users').doc(id).update(user);
  }

  deleteUser(id: string) {
    return this.firestore.collection('users').doc(id).delete();
  }
}
