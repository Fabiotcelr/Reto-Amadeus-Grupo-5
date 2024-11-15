import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class DestinoService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/api/', // URL base para las solicitudes
      // timeout: 5000,
    });
  }

  /**
   * Este método realiza una solicitud HTTP POST a un endpoint determinado, enviando los datos proporcionados en el cuerpo de la solicitud.
   * Tras la respuesta, se recibe los posibles destinos, que se devuelve como parte de los datos de la respuesta.
   * Si ocurre un error durante la solicitud, se lanza una excepción.
   *
   * @param {string} endpoint - El endpoint al que se realizará la solicitud POST.
   * @param {any} data - Los datos que se enviarán en el cuerpo de la solicitud.
   * @returns {Promise<any>} Una promesa que se resuelve con los datos de la respuesta del servidor.
   * @throws {Error} Si ocurre un problema durante la solicitud, como errores de red o del servidor.
   *
   * @example
   * try {
   *   const data = await this.sendDestinity('/endpoint', { key: 'value' });
   *   console.log(data);
   * } catch (error) {
   *   console.error('Error al enviar los datos', error);
   * }
   */
  async sendDestinity(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.axiosClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  /**
   * Este método realiza una solicitud HTTP GET a un endpoint determinado y devuelve la respuesta del servidor.
   * Si ocurre un error durante la solicitud, se lanza una excepción.
   *
   * @param {string} endpoint - El endpoint al que se realizará la solicitud GET.
   * @returns {Promise<any>} Una promesa que se resuelve con los datos de la respuesta del servidor.
   * @throws {Error} Si ocurre un problema durante la solicitud, como errores de red o del servidor.
   *
   * @example
   * try {
   *   const data = await this.getDestinity('/api/endpoint/nameDestinity1/nameDestinity2');
   *   console.log(data);
   * } catch (error) {
   *   console.error('Error al obtener los datos', error);
   * }
   */
  async getDestinity(endpoint: string): Promise<any> {
    try {
      const response = await this.axiosClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  indice: number = 0;
  destinoA: String = '';
  destinoE: String = '';
  respuestasSer: String[] = [];
  nombreS: String = '';
  correoS: String = '';
  avatar: String = 'https://cdn-icons-png.flaticon.com/512/9187/9187532.png';
  srcA: String = '';
  srcE: String = '';
}
