import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;
  mostrarContrasena: boolean = false;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public alertController: AlertController,
    private firebaseSvc: FirebaseService  // Inyecta FirebaseService
  ) {
    this.formularioRegistro = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),  // Corregido "firsName" a "firstName"
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  ngOnInit() {}

  toggleContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  async crearCuenta() {
    console.log('Formulario válido:', this.formularioRegistro.valid);

    if (this.formularioRegistro.valid) {
      try {
        const userCredentials = await this.firebaseSvc.signUp(this.formularioRegistro.value);
        console.log('Usuario creado:', userCredentials);
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Cuenta creada exitosamente. Por favor inicia sesión.',
          buttons: [{ text: 'OK', cssClass: 'primary' }],
        });
        await alert.present();
        this.router.navigate(['/login']);  // Navega al login después de la creación exitosa
      } catch (err) {
        console.error('Error al crear usuario:', err);
        let message = 'Error al crear la cuenta. Por favor, intenta nuevamente.';
        if (err.code === 'auth/email-already-in-use') {
          message = 'El correo electrónico ya está en uso. Por favor, intenta con un correo electrónico diferente o inicia sesión si ya tienes una cuenta.';
        }
        const alert = await this.alertController.create({
          header: 'Error',
          message: message,
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
