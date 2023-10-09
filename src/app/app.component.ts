import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service'; // Importa FirebaseService
import { Router } from '@angular/router'; // Importa el servicio Router

interface Componente {
  name: string;
  redirecTo: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  componentes: Componente[] = [
    {
      name: 'Inicio',
      redirecTo: '/home',
      icon: 'home-outline',
    },
    {
      name: 'Informacion',
      redirecTo: '/informacion',
      icon: 'information-outline',
    },
    // ... otros componentes ...
  ];

  constructor(
    private menuController: MenuController,
    private firebaseService: FirebaseService,
    private alertController: AlertController,
    private router: Router // Inyecta el servicio Router
  ) {}

  async logout() {
    const confirmationAlert = await this.alertController.create({
        header: 'Cerrar Sesión',
        message: '¿Estás seguro que deseas cerrar sesión?',
        buttons: [
            {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary'
            }, {
                text: 'Sí, cerrar sesión',
                handler: async () => {
                    try {
                        await this.firebaseService.signOut();
                        // Cierra el menú
                        await this.menuController.close();
                        // Navegar al login después de cerrar sesión exitosamente
                        this.router.navigate(['/login']);
                        // Muestra una alerta indicando que la sesión se cerró correctamente
                        const successAlert = await this.alertController.create({
                            header: 'Sesión Cerrada',
                            message: 'Has cerrado la sesión correctamente.',
                            buttons: ['OK']
                        });
                        await successAlert.present();

                        // Verificar la autenticación del usuario
                        this.firebaseService.user.subscribe(user => {
                            if (!user) {
                                console.log(user);
                            }
                        });

                    } catch (error) {
                        console.error('Error al cerrar sesión:', error);
                    }
                }
            }
        ]
    });
    await confirmationAlert.present();
}

}
