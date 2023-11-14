import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AsignaturaService } from '../../services/asignatura.service';
import { Asignatura } from '../../models/asignatura';

interface Docente {
  uid: string;
  name: string;
  email: string;
}

interface AsignaturaConDocente extends Asignatura {
  docenteNombre?: string;
  docenteEmail?: string;
}

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {
  asignaturas: AsignaturaConDocente[] = [];
  docentes: Docente[] = [];
  asignatura: AsignaturaConDocente = this.getEmptyAsignatura(); // Objeto para el formulario

  constructor(
    private asignaturaService: AsignaturaService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadAsignaturas();
    this.loadDocentes();
  }

  loadAsignaturas() {
    this.firestore.collection<Asignatura>('asignaturas').valueChanges({ idField: 'id' })
      .pipe(
        switchMap(asignaturas => {
          if (asignaturas.length === 0) {
            return of([]);
          }
          const docenteIds = asignaturas.map(asig => asig.docenteId);
          const docenteObservables = docenteIds.map(id =>
            this.firestore.doc<Docente>(`users/${id}`).valueChanges()
          );
          return combineLatest(docenteObservables).pipe(
            map(docentesArray => asignaturas.map(asig => ({
              ...asig,
              docenteNombre: docentesArray.find(d => d.uid === asig.docenteId)?.name,
              docenteEmail: docentesArray.find(d => d.uid === asig.docenteId)?.email
            })))
          );
        })
      )
      .subscribe(asignaturasConDocentes => {
        this.asignaturas = asignaturasConDocentes;
      });
  }

  loadDocentes() {
    this.firestore.collection('users', ref => ref.where('roleId', '==', 2))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Docente;
          const uid = a.payload.doc.id;
          return { uid, ...data };
        }))
      )
      .subscribe(docentes => {
        this.docentes = docentes;
      });
  }

  getEmptyAsignatura(): AsignaturaConDocente {
    return {
      id: '',
      nombre: '',
      horario: '',
      docenteId: '',
      docenteNombre: '',
      docenteEmail: ''
    };
  }

  createOrUpdateAsignatura() {
    if (this.asignatura.id) {
      this.asignaturaService.updateAsignatura(this.asignatura.id, this.asignatura)
        .then(() => this.afterSave());
    } else {
      this.asignaturaService.createAsignatura(this.asignatura)
        .then(() => this.afterSave());
    }
  }

  deleteAsignatura(id: string) {
    this.asignaturaService.deleteAsignatura(id)
      .then(() => this.loadAsignaturas());
  }

  prepareEdit(asignatura: AsignaturaConDocente) {
    this.asignatura = { ...asignatura };
  }

  resetForm() {
    this.asignatura = this.getEmptyAsignatura();
  }

  private afterSave() {
    this.resetForm();
    this.loadAsignaturas();
  }
}
