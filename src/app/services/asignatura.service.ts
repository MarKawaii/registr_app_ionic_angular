import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs'; // Import Observable from RxJS
import { Asignatura } from '../models/asignatura'; // Update this path as per your project structure

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  constructor(private firestore: AngularFirestore) {}

  // Method to fetch all asignaturas
  getAsignaturas(): Observable<Asignatura[]> {
    return this.firestore.collection<Asignatura>('asignaturas').valueChanges({ idField: 'id' });
  }

  // Method to fetch a single asignatura by id
  getAsignatura(id: string): Observable<Asignatura | undefined> {
    return this.firestore.doc<Asignatura>(`asignaturas/${id}`).valueChanges();
  }

  // Method to create a new asignatura
  createAsignatura(asignatura: Asignatura): Promise<void> {
    const id = this.firestore.createId(); // Generate a unique id
    return this.firestore.doc(`asignaturas/${id}`).set({ ...asignatura, id });
  }

  // Method to update an existing asignatura
  updateAsignatura(asignaturaId: string, asignatura: Asignatura): Promise<void> {
    return this.firestore.doc(`asignaturas/${asignaturaId}`).update(asignatura);
  }

  // Method to delete an asignatura
  deleteAsignatura(asignaturaId: string): Promise<void> {
    return this.firestore.doc(`asignaturas/${asignaturaId}`).delete();
  }
}
