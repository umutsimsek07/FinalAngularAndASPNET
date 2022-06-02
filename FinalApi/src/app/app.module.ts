import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { CevapDialogComponent } from './components/dialogs/cevap-dialog/cevap-dialog.component';
import { AdminCevapComponent } from './components/admin/admin-cevap/admin-cevap.component';
import { SoruDialogComponent } from './components/dialogs/soru-dialog/soru-dialog.component';
import { AdminSoruComponent } from './components/admin/admin-soru/admin-soru.component';
import { AnketDialogComponent } from './components/dialogs/anket-dialog/anket-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminAnketComponent } from './components/admin/admin-anket/admin-anket.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAlertService } from './services/myAlert.service';
import { ApiService } from './services/api.service';
// import { JoditAngularModule } from 'jodit-angular';
import { MatStepperModule } from '@angular/material/stepper';
import { AuthInterceptor } from './services/AuthInterceptor.service';
import { AuthGuard } from './services/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    //dialog
    AlertDialogComponent,
    KategoriDialogComponent,
    ConfirmDialogComponent,
    AnketDialogComponent,
    SoruDialogComponent,
    CevapDialogComponent,
    UyeDialogComponent,

    //admin
    AdminAnketComponent,
    AdminKategoriComponent,
    AdminPanelComponent,
    AdminUyeComponent,
    AdminSoruComponent,
    AdminCevapComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // JoditAngularModule,
    MatStepperModule,




    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatBadgeModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule,
  ],
  entryComponents: [
    AlertDialogComponent,
    KategoriDialogComponent,
    AnketDialogComponent,
    ConfirmDialogComponent,
    SoruDialogComponent,
    CevapDialogComponent,
    UyeDialogComponent

  ],
  providers: [MyAlertService, ApiService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
