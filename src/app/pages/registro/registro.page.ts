import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    public alertController: AlertController
  ) {
    this.formularioRegistro = this.fb.group({
      firsName: new FormControl('', [
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

  // SI EL FORMULARIO ESTA COMPLETO SE INTENTA CREAR EL USUARIO CON LA INFORMACION INGRESADA
  async crearCuenta() {
    console.log('Formulario válido:', this.formularioRegistro.valid); // Añade esto

    if (this.formularioRegistro.valid) {
      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Por favor, llena todos los campos corectamente',
        buttons: [
          {
            text: 'OK',
            cssClass: 'primary',
          },
        ],
      });
      await alert.present();
    }
  }
}
