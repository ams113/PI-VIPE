import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { VideosComponent } from './videos/video.component';
import { CrearVideoComponent } from './videos/crearvideo.component';


const pagesRoutes: Routes = [

            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [ VerificaTokenGuard],
                data: {titulo: 'Contenido VIPE'}
            },
            { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes del Tema'} },
            { path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },
            // Mantenimientos
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [ AdminGuard],
                data: {titulo: 'Gestión de Usuarios'}
            },
            { path: 'videos', component: VideosComponent, canActivate: [ AdminGuard], data: {titulo: 'Gestión de Contenido'} },
            { path: 'video/:id', component: CrearVideoComponent, canActivate: [ AdminGuard], data: {titulo: 'Creacion de Contenido'} },
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes )