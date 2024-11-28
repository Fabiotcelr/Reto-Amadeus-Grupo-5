import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  reportData: any;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.loadReportData();
  }

  async loadReportData(): Promise<void> {
    try {
      const params = {};
      this.reportData = await this.reportsService.getReportData(params);
    } catch (error) {
      console.error('Error al cargar los datos del reporte:', error);
    }
  }
}
