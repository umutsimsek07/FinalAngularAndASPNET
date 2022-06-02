import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Anket } from 'src/app/models/anket';
import { Kategori } from 'src/app/models/kategori';
import { Sonuc } from 'src/app/models/sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { AnketDialogComponent } from '../../dialogs/anket-dialog/anket-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-anket',
  templateUrl: './admin-anket.component.html',
  styleUrls: ['./admin-anket.component.scss']
})
export class AdminAnketComponent implements OnInit {
  anketler: Anket[];
  kategoriler: Kategori[];
  katId: number;
  uyeid: number;
  secKat:Kategori;
  dataSource: any;
  displayedColumns = ['AnketKategoriAdi', 'AnketAdi', 'AnketSoruSayi', 'AnketKayTarih', 'AnketDuzTarih', 'detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<AnketDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.KategoriListe();
    this.uyeid = parseInt(localStorage.getItem('UyeId'));
    this.route.params.subscribe(p => {
      if (p.KategoriId) {
        this.katId = p.KategoriId; 
        this.AnketListe();
      }
    });
  }

  AnketListe() {
    this.apiServis.AnketListeleByKategoriId(this.katId).subscribe((d: Anket[]) => {
      this.anketler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  KategoriListe() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    });
  }
  KategoriSec(kat: Kategori) {
    this.katId = kat.KategoriId;
    this.AnketListe();
  }
  // KategoriById(){
  //   this.apiServis.KategoriById(this.katId).subscribe((d: Kategori)=>{
  //     this.secKat=d;
  //   });
  // }

  Ekle() {
    var yeniKayit: Anket = new Anket();
    this.dialogRef = this.matDialog.open(AnketDialogComponent, {
      width: '800px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        yeniKayit=d;
        yeniKayit.AnketDuzTarih= new Date();
        yeniKayit.AnketKayTarih=new Date();
        yeniKayit.AnketUyeId=this.uyeid;
        this.apiServis.AnketEkle(yeniKayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AnketListe();
          }
        });
      }
    });
  }
  Duzenle(kayit: Anket) {
    this.dialogRef = this.matDialog.open(AnketDialogComponent, {
      width: '800px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.AnketAdi = d.AnketAdi;
        kayit.AnketDuzTarih=new Date();
        kayit.AnketKategoriId=d.AnketKategoriId;
        this.apiServis.AnketDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AnketListe();
          }
        });
      }
    });
  }
  Sil(kayit: Anket) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',

    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.AnketAdi + " Adlı Anket Silinecektir Onaylıyor musunuz ?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.AnketSil(kayit.AnketId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AnketListe();
          }
        });
      }
    });
  }
}
