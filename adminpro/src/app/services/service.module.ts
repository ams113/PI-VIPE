import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingService,
  SidebarService, SharedService,
  UsuarioService, LoginGuardGuard,
  AdminGuard, VerificaTokenGuard,
  SubirArchivoService,
  VideoService
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    VideoService,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
