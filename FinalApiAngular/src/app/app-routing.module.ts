import { AdminSoruComponent } from './components/admin/admin-soru/admin-soru.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminAnketComponent } from './components/admin/admin-anket/admin-anket.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { NgModule } from '@angular/core';
import { RouterModule,Routes  } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminCevapComponent } from './components/admin/admin-cevap/admin-cevap.component';
import { AuthGuard } from './services/AuthGuard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate:[AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit: '/home'
    }
  },
  {
    path: 'admin/kategori',
    component: AdminKategoriComponent,
    canActivate:[AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit: '/home'
    }
  },
  {
    path: 'admin/anket',
    component: AdminAnketComponent,
    canActivate:[AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit: '/home'
    }
  },
  {
    path: 'admin/anket/:KategoriId',
    component: AdminAnketComponent,
    canActivate:[AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit: '/home'
    }
  },
  {
    path: 'admin/soru/:AnketId',
    component: AdminSoruComponent,
    canActivate:[AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit: '/home'
    }
  },
  {
    path: 'admin/cevap/:SorularId',
    component: AdminCevapComponent,
    canActivate:[AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit: '/home'
    }
  },
  {
    path: 'admin/uye',
    component: AdminUyeComponent,
    canActivate:[AuthGuard],
    data:{
      yetkiler: ['Admin'],
      gerigit: '/home'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
