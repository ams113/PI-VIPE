import { NgModule } from "@angular/core";

import { PAGES_ROUTES } from "./pages.routes";

import { PagesComponent } from './pages.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VideosComponent } from './videos/video.component';
import { CrearVideoComponent } from './videos/crearvideo.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
    declarations: [
        DashboardComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        BusquedaComponent,
        VideosComponent,
        CrearVideoComponent
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
        PAGES_ROUTES,
        SharedModule,
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule
    ]
})

export class PageModule { }