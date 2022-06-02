import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Anket } from 'src/app/models/anket';
import { Cevap } from 'src/app/models/cevap';
import { Kategori } from 'src/app/models/kategori';
import { Sonuc } from 'src/app/models/sonuc';
import { Soru } from 'src/app/models/soru';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { CevapDialogComponent } from '../../dialogs/cevap-dialog/cevap-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-cevap',
  templateUrl: './admin-cevap.component.html',
  styleUrls: ['./admin-cevap.component.scss']
})
export class AdminCevapComponent implements OnInit {
  anketler: Anket[];
  cevaplar:Cevap[];
  kategoriler: Kategori[];
  sorular:Soru[];
  katId: number;
  soruId: number;
  uyeid: number;
  secKat:Kategori;
  secAnket:Anket;
  secSoru:Soru;
  dataSource: any;
  displayedColumns = ['CevapMetin', 'CevapTarih','detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<CevapDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  favoriteSeason: string;
  cevapSeasons: string[] = ['Evet', 'Hayır', 'Kısmen', 'Kesinlikle Hayır'];
  // seasons: string[] = ['Evet', 'Hayır', 'Kısmen', 'Kesinlikle Hayır'];
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.SoruListe();
    this.uyeid = parseInt(localStorage.getItem('UyeId'));
    this.route.params.subscribe(p => {
      if (p.SorularId) {
        this.soruId = p.SorularId; 
        this.CevapListele();
      }
    });
  }

  CevapListele() {
    this.apiServis.CevapListeleBySoruId(this.soruId).subscribe((d: Cevap[]) => {
      this.cevaplar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  SoruListe() {
    this.apiServis.SoruListele().subscribe((d: Soru[]) => {
      this.sorular = d;
    });
  }
  SoruSec(kat: Soru) {
    this.soruId = kat.SorularId;
    this.CevapListele();
  }
  // KategoriById(){
  //   this.apiServis.KategoriById(this.katId).subscribe((d: Kategori)=>{
  //     this.secKat=d;
  //   });
  // }

  Ekle() {
    var yeniKayit: Cevap = new Cevap();
    this.dialogRef = this.matDialog.open(CevapDialogComponent, {
      width: '800px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        yeniKayit=d;
        yeniKayit.CevapTarih=new Date();
        yeniKayit.CevapUyeId=this.uyeid;
        this.apiServis.CevapEkle(yeniKayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.CevapListele();
          }
        });
      }
    });
  }
  Duzenle(kayit: Cevap) {
    this.dialogRef = this.matDialog.open(CevapDialogComponent, {
      width: '800px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.CevapMetin = d.CevapMetin;
        kayit.CevapTarih=new Date();

        this.apiServis.CevapDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.CevapListele();
          }
        });
      }
    });
  }
  Sil(kayit: Cevap) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',

    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.CevapMetin + " Adlı Cevap Silinecektir Onaylıyor musunuz ?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.CevapSil(kayit.CevapId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.CevapListele();
          }
        });
      }
    });
  }
}
