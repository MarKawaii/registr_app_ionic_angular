import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';  // Importa FirebaseService

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
      firstName: new FormControl('', [  // Corregido el nombre del campo a 'firstName'
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
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

  async crearCuenta() {
    if (this.formularioRegistro.valid) {
      try {
        const userValue = {
          ...this.formularioRegistro.value,
          email: this.formularioRegistro.value.email,
          password: this.formularioRegistro.value.password,
        };
        const res = await this.firebaseSvc.signUp(userValue);
        console.log('Usuario creado:', res);
        this.router.navigate(['/home']);
      } catch (err) {
        console.error('Error al crear usuario:', err);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error al crear la cuenta. Por favor, intenta nuevamente.',
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
