import { Anket } from './../../models/anket';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Kategori } from 'src/app/models/kategori';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UyeDialogComponent } from '../dialogs/uye-dialog/uye-dialog.component';
import { Sonuc } from 'src/app/models/sonuc';
import { Uye } from 'src/app/models/uye';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  
  AdSoyad: string;
  kategoriler: Kategori[];
  anketler:Anket[];
  uye: Uye[];
  UyeId:number;
  dataSource: any;
  frm:FormGroup;

  dialogRef:MatDialogRef<UyeDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private breakpointObserver: BreakpointObserver,
    public matDialog: MatDialog,    
    public apiServis: ApiService,
    public alert: MyAlertService,  
      public frmBuild :FormBuilder,

    

  ) { }
  ngOnInit(): void {
    this.kategoriListele();
    this.anketListele();
    if (this.apiServis.oturumKontrol) {
      this.AdSoyad = localStorage.getItem("UyeAdSoyad");
    }
  }
  OturumKapat() {
    localStorage.clear();
    location.href = "/";
  }
  kategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    });
  }
  anketListele() {
    this.apiServis.AnketListe().subscribe((d: Anket[]) => {
      this.anketler = d;
    });
  }
  UyeEkle(){
    var yenikayit:Uye = new Uye();
    this.dialogRef=this.matDialog.open(UyeDialogComponent,{
    width:'800px',
    data:{
      kayit: yenikayit,
      islem:'ekle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
  if(d){
    yenikayit = d;
    yenikayit.UyeKayTarih = new Date();
    yenikayit.UyeId = this.UyeId;
    this.apiServis.UyeEkle(yenikayit).subscribe((s:Sonuc)=>{
      this.alert.AlertUygula(s);

    });
  }
  });
  }
  UyeListele() {
    this.apiServis.UyeListele().subscribe((d: Uye[]) => {
      this.uye = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }
}
