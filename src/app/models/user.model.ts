export interface User {
  uid: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  password: string;
  status: boolean; // Nuevo campo
  roleId: number; // Nuevo campo, referencia a un documento en la colección 'roles'
  // ... otros campos ...
}
