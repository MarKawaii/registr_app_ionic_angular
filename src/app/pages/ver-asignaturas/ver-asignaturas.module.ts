import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerAsignaturasPageRoutingModule } from './ver-asignaturas-routing.module';

import { VerAsignaturasPage } from './ver-asignaturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerAsignaturasPageRoutingModule
  ],
  declarations: [VerAsignaturasPage]
})
export class VerAsignaturasPageModule {}
