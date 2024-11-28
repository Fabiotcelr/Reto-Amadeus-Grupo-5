import { Routes } from '@angular/router';

import path from 'node:path';
import { IndexComponent } from './pages/index/index.component';
import { DestinoComponent } from './pages/destino/destino.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { TarjetasComponent } from './pages/tarjetas/tarjetas.component';
import { Component } from '@angular/core';
import { ReportsComponent } from './pages/reports/reports.component';
import {authGuard} from "./interceptors/auth.guard";

export const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'destino', component: DestinoComponent, canActivate: [authGuard] },
  { path: 'perfil', component: PerfilComponent },
  { path: 'resultados', component: ResultadosComponent,  canActivate: [authGuard] },
  { path: 'tarjetas', component: TarjetasComponent, canActivate: [authGuard] },
  { path: 'planes', component: PlanesComponent,  canActivate: [authGuard] },
  { path: 'reports', component: ReportsComponent,  canActivate: [authGuard] },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
];
