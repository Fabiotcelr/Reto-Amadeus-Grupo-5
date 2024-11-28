import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";


export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Verificando token...');

  if (authService.isTokenValid()) {
    console.log('Token válido. Permitiendo acceso.');

    return true;
  } else {
    console.error('Token inválido. Redirigiendo a /perfil...');
    router.navigate(['/perfil']);
    return false;
  }
};
