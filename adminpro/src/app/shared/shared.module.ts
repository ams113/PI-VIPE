import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { NopageComponent } from '../shared/nopage/nopage.component';

import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent} from '../components/modal-upload/modal-upload.component';
import { ModalUploadFileComponent} from '../components/modal-uploadFile/modal-uploadFile.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        NopageComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent,
        ModalUploadFileComponent
    ],
    exports: [
        NopageComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadFileComponent,
        ModalUploadComponent
    ]
})

export class SharedModule { }