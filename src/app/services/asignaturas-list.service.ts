import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Asignatura } from '../models/asignatura'; // Make sure this path is correct

@Injectable({
  providedIn: 'root'
})
export class AsignaturasListService {
  constructor(private firestore: AngularFirestore) {}

  getAllAsignaturas(): Observable<Asignatura[]> {
    return this.firestore.collection<Asignatura>('asignaturas').valueChanges({ idField: 'id' });
  }
}
