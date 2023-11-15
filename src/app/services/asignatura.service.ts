import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Asignatura } from '../models/asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  constructor(private firestore: AngularFirestore) {}

  getAsignatura(id: string) {
    return this.firestore.doc(`asignaturas/${id}`).valueChanges();
  }

  createAsignatura(asignatura: Asignatura) {
    return this.firestore.collection('asignaturas').add(asignatura);
  }

  updateAsignatura(asignaturaId: string, asignatura: Asignatura) {
    return this.firestore.doc(`asignaturas/${asignaturaId}`).update(asignatura);
  }

  deleteAsignatura(asignaturaId: string) {
    return this.firestore.doc(`asignaturas/${asignaturaId}`).delete();
  }
  
  
}