import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import {AuthService} from "@services/auth.service";

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent implements OnInit, OnDestroy {
  constructor(public destinoService: DestinoService, public router: Router,  private authService: AuthService) {}

  private routerSubscription!: Subscription;

  esVisible = signal(false);
  avatar: any;
  nombre: any;
  correo: any;
  ruta: String = '';

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.obtenerDatosUsuario();
        this.ruta = this.router.url;
      });
    this.obtenerDatosUsuario();

  }

  obtenerDatosUsuario() {
    setTimeout(() => {
      this.avatar = this.destinoService.avatar;
      this.nombre = localStorage.getItem('user_name');  // Obtén el nombre desde el localStorage
      this.correo = localStorage.getItem('user_email');  // Obtén el correo desde el localStorage
    }, 500);
  }

  handleVisible() {
    this.esVisible.set(!this.esVisible());
  }

  iniciarSesion(){
    this.router.navigate(['/perfil']);
    this.esVisible.set(!this.esVisible());
  }

  cerrarSesion() {
    this.destinoService.avatar =
      'https://cdn-icons-png.flaticon.com/512/9187/9187532.png';
    localStorage.removeItem('user_name'); // Elimina el nombre del localStorage
    localStorage.removeItem('user_email'); // Elimina el correo del localStorage
    this.router.navigate(['/index']);
    this.authService.logout();

  }

  ngOnDestroy(): void {
    // Nos aseguramos de cancelar la suscripción para evitar fugas de memoria
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
