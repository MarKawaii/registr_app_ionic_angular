import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../../models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  mostrarContrasena: boolean = false;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public alertController: AlertController,
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {
    // Corrección: Debes pasar un objeto con las claves y FormControl
    this.formularioLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }


  ngOnInit() {}

  toggleContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  async iniciarSesion() {
    console.log('Datos ingresados por el usuario:', this.formularioLogin.value);
    
    if (this.formularioLogin.valid) {
      let loading: any;
      
      try {
        loading = await this.utilsSvc.loading();
        await loading.present();
  
        const res = await this.firebaseSvc.singIn(this.formularioLogin.value as User);
        console.log(res);
  
        await loading.dismiss();
        this.router.navigate(['/home']);
      } catch (err) {
        if (loading) {
          await loading.dismiss();
        }
        console.error('Error al iniciar sesión:', err);
  
        // Aquí puedes mostrar una alerta con el mensaje del error, por ejemplo.
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error al iniciar sesión. Por favor, intenta nuevamente.',
          buttons: [{ text: 'OK', cssClass: 'primary' }],
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Por favor, llena todos los campos correctamente',
        buttons: [{ text: 'OK', cssClass: 'primary' }],
      });
      await alert.present();
    }
  }
  
}
