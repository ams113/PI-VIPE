import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from "./pages.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuardGuard, VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from "./medicos/medicos.component";
import { MedicoComponent } from "./medicos/medico.component";
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { VideosComponent } from './videos/video.component';
import { CrearVideoComponent } from './videos/crearvideo.component';


const pagesRoutes: Routes = [

            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [ VerificaTokenGuard],
                data: {titulo: 'Dasboard'}
            },
            //{ path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
            //{ path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'} },
            //{ path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
            //{ path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes del Tema'} },
            { path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'} },
            // Mantenimientos
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [ AdminGuard],
                data: {titulo: 'Gestión de Usuarios'}
            },
            { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Gestión de Hospitales'} },
            { path: 'videos', component: VideosComponent, data: {titulo: 'Gestión de Contenido'} },
            { path: 'video/:id', component: CrearVideoComponent, data: {titulo: 'Creacion de Contenido'} },
            { path: 'medicos', component: MedicosComponent, data: {titulo: 'Gestión de Médicos'} },
            { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Médico'} },
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes )