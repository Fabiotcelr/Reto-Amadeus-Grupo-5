import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReportsService } from "@services/reports.service";
import { HighchartsChartModule } from 'highcharts-angular';
import { Location } from '@angular/common';
import * as Highcharts from 'highcharts';
import { Chart } from "highcharts";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  providers: [ReportsService],
})
export class ReportsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  nameData: any[] = [];
  pDestinoChartOptions: Highcharts.Options = {};
  pClimaticaChartOptions: Highcharts.Options = {};
  pAlojamientoChartOptions: Highcharts.Options = {};
  pActividadChartOptions: Highcharts.Options = {};
  dViajeChartOptions: Highcharts.Options = {};
  edadChartOptions: Highcharts.Options = {};

  constructor(private reportsService: ReportsService, private location: Location) {}

  ngOnInit(): void {
    this.loadReportData();
  }

  async loadReportData(): Promise<void> {
    try {
      this.nameData = await this.reportsService.getReports();
      this.createChart();
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.warn('No se encontraron datos del reporte, cargando gráficos vacíos.');
        this.nameData = [];
        this.createChart();
      } else {
        console.error('Error al cargar los datos del reporte:', error);
      }
    }
  }

  processReportData(nameData: any[]): any {
    const totalReports = nameData.length;
    const pDestino: { [key: string]: number } = {};
    const pClimatica: { [key: string]: number } = {};
    const pAlojamiento: { [key: string]: number } = {};
    const pActividad: { [key: string]: number } = {};
    const dViaje: { [key: string]: number } = {};
    const edad: { [key: string]: number } = {};

    nameData.forEach((report: any) => {
      report.userQueries.forEach((query: any) => {
        pDestino[query.pDestino] = (pDestino[query.pDestino] || 0) + 1;
        pClimatica[query.pClimatica] = (pClimatica[query.pClimatica] || 0) + 1;
        pAlojamiento[query.pAlojamiento] = (pAlojamiento[query.pAlojamiento] || 0) + 1;
        pActividad[query.pActividad] = (pActividad[query.pActividad] || 0) + 1;
        dViaje[query.dViaje] = (dViaje[query.dViaje] || 0) + 1;
        edad[query.edad] = (edad[query.edad] || 0) + 1;
      });
    });

    const calculatePercentages = (data: { [key: string]: number }) => {
      return Object.keys(data).map(key => ({
        name: key,
        y: (data[key] / totalReports) * 100
      }));
    };

    return {
      pDestino: calculatePercentages(pDestino),
      pClimatica: calculatePercentages(pClimatica),
      pAlojamiento: calculatePercentages(pAlojamiento),
      pActividad: calculatePercentages(pActividad),
      dViaje: calculatePercentages(dViaje),
      edad: calculatePercentages(edad)
    };
  }

  createChart(): void {
    if (!this.nameData || this.nameData.length === 0) {
      this.pDestinoChartOptions = this.createEmptyChartOptions('Distribución de Tipos de Entorno');
      this.pClimaticaChartOptions = this.createEmptyChartOptions('Distribución de Tipos de Clima');
      this.pAlojamientoChartOptions = this.createEmptyChartOptions('Distribución de Tipos de Alojamiento');
      this.pActividadChartOptions = this.createEmptyChartOptions('Distribución de Tipos de Actividad');
      this.dViajeChartOptions = this.createEmptyChartOptions('Distribución de Duraciones de Estancia');
      this.edadChartOptions = this.createEmptyChartOptions('Distribución de Rangos de Edad');
      return;
    }

    const processedData = this.processReportData(this.nameData);

    this.pDestinoChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Distribución de Tipos de Entorno'
      },
      series: [{
        type: 'pie',
        name: 'Porcentaje',
        data: processedData.pDestino
      }]
    };

    this.pClimaticaChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Distribución de Tipos de Clima'
      },
      series: [{
        type: 'pie',
        name: 'Porcentaje',
        data: processedData.pClimatica
      }]
    };

    this.pAlojamientoChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Distribución de Tipos de Alojamiento'
      },
      series: [{
        type: 'pie',
        name: 'Porcentaje',
        data: processedData.pAlojamiento
      }]
    };

    this.pActividadChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Distribución de Tipos de Actividad'
      },
      series: [{
        type: 'pie',
        name: 'Porcentaje',
        data: processedData.pActividad
      }]
    };

    this.dViajeChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Distribución de Duraciones de Estancia'
      },
      series: [{
        type: 'pie',
        name: 'Porcentaje',
        data: processedData.dViaje
      }]
    };

    this.edadChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Distribución de Rangos de Edad'
      },
      series: [{
        type: 'pie',
        name: 'Porcentaje',
        data: processedData.edad
      }]
    };
  }

  createEmptyChartOptions(title: string): Highcharts.Options {
    return {
      chart: {
        type: 'pie'
      },
      title: {
        text: title
      },
      series: [{
        type: 'pie',
        name: 'Porcentaje',
        data: []
      }]
    };
  }


  goBack(): void {
    this.location.back();
  }
}
