import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopageComponent } from './shared/nopage/nopage.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard],
        loadChildren:  './pages/pages.module#PageModule'
    },
    { path: '**', pathMatch: 'full', component: NopageComponent }

];

export const APPROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );