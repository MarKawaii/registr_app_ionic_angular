import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class RolesService {  // Renombrado a RolesService

  constructor(private afs: AngularFirestore) {}

  // Obtener todos los roles
  getRoles() {
    return this.afs.collection('roles').valueChanges({ idField: 'roleId' });
  }

  // Obtener un rol específico
  getRole(roleId: number) {
    return this.afs.collection('roles').doc(roleId.toString()).valueChanges();
  }

  // Añadir un nuevo rol
  addRole(roleId: number, roleName: string) {
    return this.afs.collection('roles').doc(roleId.toString()).set({ name: roleName });
  }

  // Actualizar un rol existente
  updateRole(roleId: number, roleName: string) {
    return this.afs.collection('roles').doc(roleId.toString()).update({ name: roleName });
  }

  // Eliminar un rol
  deleteRole(roleId: number) {
    return this.afs.collection('roles').doc(roleId.toString()).delete();
  }

}
