import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AlertController } from '@ionic/angular';
// import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, ) {
    this.formularioRegistro = this.fb.group({
      'firsName': new FormControl("", [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl("", [Validators.required, Validators.minLength(3)]),
      'email': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", [Validators.required, Validators.minLength(5)])
    });
    
  }

  ngOnInit() {}

  async crearCuenta() {
    if (this.formularioRegistro.valid) {
      // const user = {
      //   ...this.formularioRegistro.value,
      //   estado: 0
      // };
      // this.userService.createUser(user).then(() => {
      //   console.log('Usuario creado');
      // }).catch(error => {
      //   console.error('Error al crear usuario: ', error);
      // });
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, llena todos los campos.',
        buttons: [{
            text: 'OK',
            cssClass: 'primary'
        }]
    });
    
    await alert.present();
    
    }
  }

}
