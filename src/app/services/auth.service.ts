import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private axiosClient: AxiosInstance;
  private jwtHelper: JwtHelperService;

  constructor() {
    this.jwtHelper = new JwtHelperService(); // Inicializa el helper JWT

    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/', // Cambia esta URL por la de tu backend
    });
  }

  /**
   * Realiza el login del usuario y guarda el token en el localStorage.
   * @param {string} email - El email del usuario
   * @param {string} name - La contraseña del usuario
   * @returns {Promise<any>} La respuesta del servidor
   */
  async generateToken(name: string, email: string): Promise<any> {
    try {
      const response = await this.axiosClient.post('auth/login', { name, email });

      // Respuesta del servidor en la consola
      console.log('Respuesta del servidor:', response.data);

      // Token está presente en la respuesta
      const token = response.data.token;

      if (token) {
        // Guarda el token en el localStorage
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_name', name); // Guardamos el nombre
        localStorage.setItem('user_email', email); // Guardamos el correo
        console.log('Token guardado correctamente');
      } else {
        console.error('No se recibió el token');
        throw new Error('Usuario o contraseña incorrectos');
      }

      return response.data;
    } catch (error) {
      console.error('Error en el login:', error);
      throw new Error('No se pudo autenticar. Verifica tus credenciales.');
    }
  }

  /**
   * Obtiene el token del localStorage.
   * @returns {string | null} El token guardado o `null` si no existe.
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Verifica si el token es válido.
   * @returns {boolean} `true` si el token es válido, `false` en caso contrario.
   */
  isTokenValid(): boolean {
    const token = this.getToken();
    console.log('Token:', token);

    if (!token) {
      console.log('No hay token presente.');
      return false;
    }

    const isExpired = this.jwtHelper.isTokenExpired(token);
    if (isExpired) {
      console.log('El token ha expirado.');
      this.logout();
      return false;
    }

    console.log('El token es válido.');
    return true;
  }

  /**
   * Elimina el token y redirige al login.
   */
  logout(): void {
    localStorage.removeItem('access_token');
    console.log('Sesión cerrada. Redirigiendo a /index...');
    window.location.href = '/index'; // Redirige al inicio
  }

  /**
   * Crea un usuario en el backend.
   * @param {string} endpoint - El endpoint para crear el usuario.
   * @param {any} data - Los datos del usuario.
   * @returns {Promise<any>} La respuesta del servidor.
   */
  async createUser(endpoint: string, data: any): Promise<any> {
    try {
      const response = await this.axiosClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error en createUser:', error);
      throw error;
    }
  }

  /**
   * Autentica al usuario usando el token almacenado en el localStorage.
   * @param {string} name - El nombre del usuario.
   * @param {string} email - El email del usuario.
   * @returns {Promise<any>} La respuesta del servidor.
   */
  async authenticate(name: string, email: string): Promise<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No se encontró el token');
    }

    try {
      const response = await this.axiosClient.post(
          'user/login',
          { name, email },
          { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Autenticación exitosa:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en la autenticación:', error);
      throw new Error('No se pudo autenticar con el token proporcionado.');
    }
  }
}
