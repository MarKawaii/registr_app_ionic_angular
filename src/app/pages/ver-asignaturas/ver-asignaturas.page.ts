import { Component, OnInit, OnDestroy } from '@angular/core';
import QRCode from 'qrcode';

@Component({
  selector: 'app-ver-asignaturas',
  templateUrl: './ver-asignaturas.page.html',
  styleUrls: ['./ver-asignaturas.page.scss'],
})
export class VerAsignaturasPage implements OnInit, OnDestroy {
  qrData = 'Información inicial del QR';
  generatedQRCode = '';
  asignaturas: string[] = ['Asignatura 1', 'Asignatura 2', 'Asignatura 3'];
  showQR: boolean = false;
  qrTimer: any;
  countdown: number = 120; // 2 minutos en segundos

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.qrTimer) {
      clearInterval(this.qrTimer);
    }
  }

  onAsignaturaClick(asignatura: string) {
    this.qrData = `Información de la asignatura: ${asignatura}`;
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
        console.error(err);
      });
  }

  startQRTimer() {
    this.countdown = 120; // Reiniciar el contador
    if (this.qrTimer) {
      clearInterval(this.qrTimer);
    }
    this.qrTimer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.generateQRCode(); // Generar un nuevo QR después de 2 minutos
        this.countdown = 120; // Reiniciar el contador
      }
    }, 1000); // Actualizar cada segundo
  }

  closeQR() {
    this.showQR = false;
    if (this.qrTimer) {
      clearInterval(this.qrTimer);
    }
  }
}
