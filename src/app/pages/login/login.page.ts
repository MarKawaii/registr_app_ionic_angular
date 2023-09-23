import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  mostrarContrasena: boolean = false;

  constructor(private router: Router, public fb: FormBuilder, public alertController: AlertController,) { 
    // Corrección: Debes pasar un objeto con las claves y FormControl
    this.formularioLogin = this.fb.group({
      'email': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", [Validators.required, Validators.minLength(5)])
    });
  }
  
  ngOnInit() {
  }

  toggleContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  async iniciarSesion() {
    console.log('Formulario válido:', this.formularioLogin.valid); // Añade esto
    
    // Si el formulario esta completo se intenta iniciar sesion. con la informacion del usuario
    if (this.formularioLogin.valid) {
      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Por favor, llena todos los campos corectamente',
        buttons: [{
            text: 'OK',
            cssClass: 'primary'
        }]
      });
      await alert.present();
    }
  }

}
