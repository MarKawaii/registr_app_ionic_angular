import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Feriados } from '../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Añadir OnDestroy
  feriados: Feriados[] = [];
  filterActive: boolean = true;
  loading: boolean = true;
  currentTime: string = new Date().toISOString();

  constructor(
    private menuController: MenuController,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef // Añadir esto
  ) {}

  ngOnInit() {
    this.cargarFeriados();
  }

  cargarFeriados() {
    const fechaActual = new Date();

    this.apiService.getTopHeadLines().subscribe((resp) => {
      const feriadosProximos = this.filtrarFeriados(resp.data, fechaActual);
      this.loading = false;
      this.feriados = [...feriadosProximos];
    });
  }

  filtrarFeriados(listaFeriados: Feriados[], fechaActual: Date): Feriados[] {
    let feriadosFiltrados = listaFeriados.filter((feriado) => {
      const fechaFeriado = new Date(feriado.date);
      return fechaFeriado >= fechaActual;
    });

    if (this.filterActive) {
      feriadosFiltrados = feriadosFiltrados.filter(
        (feriado) => feriado.inalienable === true
      );
    }

    feriadosFiltrados.forEach((feriado) => {
      feriado.date = this.formatearFecha(feriado.date);
    });

    feriadosFiltrados.sort((a, b) => {
      const fechaA = new Date(a.date.split('-').reverse().join('-'));
      const fechaB = new Date(b.date.split('-').reverse().join('-'));
      return fechaA.getTime() - fechaB.getTime();
    });

    return feriadosFiltrados;
  }

  formatearFecha(fechaEntrada: string): string {
    const fecha = new Date(fechaEntrada);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const ano = fecha.getFullYear();
    return `${dia}-${mes}-${ano}`;
  }

  cambiarFiltro() {
    this.filterActive = !this.filterActive;
    this.cargarFeriados();
  }

  mostrarMenu() {
    this.menuController.open('first');
  }
}
