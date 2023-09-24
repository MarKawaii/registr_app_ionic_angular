import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private loadingCtrl: LoadingController) {}

  // Loading
  async loading() {
    return await this.loadingCtrl.create({spinner: 'crescent'});
  } 
}
