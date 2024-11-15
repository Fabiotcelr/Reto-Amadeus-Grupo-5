import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent implements OnInit, OnDestroy {
  constructor(public destinoService: DestinoService, public router: Router) {}

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
  }

  obtenerDatosUsuario() {
    setTimeout(() => {
      this.avatar = this.destinoService.avatar;
      this.nombre = this.destinoService.nombreS;
      this.correo = this.destinoService.correoS;
    }, 500);
  }

  handleVisible() {
    this.esVisible.set(!this.esVisible());
  }

  cerrarSesion() {
    this.destinoService.avatar =
      'https://cdn-icons-png.flaticon.com/512/9187/9187532.png';
    this.destinoService.nombreS = '';
    this.destinoService.correoS = '';
    this.router.navigate(['/index']);
  }

  ngOnDestroy(): void {
    // Nos aseguramos de cancelar la suscripción para evitar fugas de memoria
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
