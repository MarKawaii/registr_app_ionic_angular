import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Acceso Denegado',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
