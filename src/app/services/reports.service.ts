import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private apiUrl = 'http://localhost:8080/api/reports';

  async createReport(reportRequest: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/createReport`, reportRequest);
      return response.data;
    } catch (error) {
      console.error('Error al crear el reporte:', error);
      throw error;
    }
  }

  async getReports(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/getReports`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
      throw error;
    }
  }
}