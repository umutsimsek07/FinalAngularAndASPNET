import { SoruDialogComponent } from './../../dialogs/soru-dialog/soru-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Anket } from 'src/app/models/anket';
import { Kategori } from 'src/app/models/kategori';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/sonuc';
import { Soru } from 'src/app/models/soru';

@Component({
  selector: 'app-admin-soru',
  templateUrl: './admin-soru.component.html',
  styleUrls: ['./admin-soru.component.scss']
})
export class AdminSoruComponent implements OnInit {
  anketler: Anket[];
  kategoriler: Kategori[];
  sorular:Soru[];
  katId: number;
  anketId: number;
  uyeid: number;
  secKat:Kategori;
  secAnket:Anket;
  dataSource: any;
  displayedColumns = ['SoruMetin', 'SoruCevapSayi', 'SoruKayTarih', 'SoruDuzTarih','detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<SoruDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.AnketListe();
    this.uyeid = parseInt(localStorage.getItem('UyeId'));
    this.route.params.subscribe(p => {
      if (p.AnketId) {
        this.anketId = p.AnketId; 
        this.SoruListe();
      }
    });
  }

  SoruListe() {
    this.apiServis.SoruListeleByAnketId(this.anketId).subscribe((d: Soru[]) => {
      this.sorular = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  AnketListe() {
    this.apiServis.AnketListe().subscribe((d: Anket[]) => {
      this.anketler = d;
    });
  }
  AnketSec(kat: Anket) {
    this.anketId = kat.AnketId;
    this.SoruListe();
  }
  // KategoriById(){
  //   this.apiServis.KategoriById(this.katId).subscribe((d: Kategori)=>{
  //     this.secKat=d;
  //   });
  // }

  Ekle() {
    var yeniKayit: Soru = new Soru();
    this.dialogRef = this.matDialog.open(SoruDialogComponent, {
      width: '800px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        yeniKayit=d;
        yeniKayit.SoruKayTarih=new Date();
        yeniKayit.SoruDuzTarih=new Date();
        yeniKayit.SoruUyeId=this.uyeid;
        this.apiServis.SoruEkle(yeniKayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SoruListe();
          }
        });
      }
    });
  }
  Duzenle(kayit: Soru) {
    this.dialogRef = this.matDialog.open(SoruDialogComponent, {
      width: '800px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.SoruMetin = d.SoruMetin;
        kayit.SoruDuzTarih=new Date();

        this.apiServis.SoruDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SoruListe();
          }
        });
      }
    });
  }
  Sil(kayit: Soru) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',

    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.SoruMetin + " Adlı Anket Silinecektir Onaylıyor musunuz ?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.SoruSil(kayit.SorularId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SoruListe();
          }
        });
      }
    });
  }
}
