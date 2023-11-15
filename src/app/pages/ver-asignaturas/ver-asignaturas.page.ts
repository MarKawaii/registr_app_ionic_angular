import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import QRCode from 'qrcode';
import { Asignatura } from '../../models/asignatura'; // Update the path as per your project structure
import { AsignaturasListService } from '../../services/asignaturas-list.service'; // Update the path as per your project structure

@Component({
  selector: 'app-ver-asignaturas',
  templateUrl: './ver-asignaturas.page.html',
  styleUrls: ['./ver-asignaturas.page.scss'],
})
export class VerAsignaturasPage implements OnInit, OnDestroy {
  asignaturas$: Observable<Asignatura[]>;
  generatedQRCode: string = '';
  showQR: boolean = false;
  qrTimer: any;
  countdown: number = 120;
  qrData: string = '';

  constructor(private asignaturasListService: AsignaturasListService) {}

  ngOnInit() {
    this.asignaturas$ = this.asignaturasListService.getAllAsignaturas();
  }

  ngOnDestroy() {
    if (this.qrTimer) {
      clearInterval(this.qrTimer);
    }
  }

  onAsignaturaClick(asignatura: Asignatura) {
    this.qrData = `Información de la asignatura: ${JSON.stringify(asignatura)}`;
    this.generateQRCode();
  }

  generateQRCode() {
    QRCode.toDataURL(this.qrData)
      .then(url => {
        this.generatedQRCode = url;
        this.showQR = true;
        this.startQRTimer();
      })
      .catch(err => {
        console.error('Error al generar el código QR:', err);
      });
  }

  startQRTimer() {
    this.countdown = 120;
    if (this.qrTimer) {
      clearInterval(this.qrTimer);
    }
    this.qrTimer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.generateQRCode();
        this.countdown = 120;
      }
    }, 1000);
  }

  closeQR() {
    this.showQR = false;
    if (this.qrTimer) {
      clearInterval(this.qrTimer);
    }
  }
}
