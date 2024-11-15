import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/user',
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
   *   const data = await this.createUser('/endpoint', { key: 'value' });
   *   console.log(data);
   * } catch (error) {
   *   console.error('Error al enviar los datos', error);
   * }
   */
  async createUser(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.axiosClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }
}
