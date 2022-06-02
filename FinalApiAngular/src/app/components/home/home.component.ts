import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
// import { Button } from 'jodit/types/core/ui';
import { Anket } from 'src/app/models/anket';
import { Cevap } from 'src/app/models/cevap';
import { Kategori } from 'src/app/models/kategori';
import { Sonuc } from 'src/app/models/sonuc';
import { Soru } from 'src/app/models/soru';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { AnketDialogComponent } from '../dialogs/anket-dialog/anket-dialog.component';
import { CevapDialogComponent } from '../dialogs/cevap-dialog/cevap-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from '../dialogs/kategori-dialog/kategori-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLinear = true;
  gostergizle: boolean = false;
  yeniKategori: Kategori;
  anketler: Anket[];
  cevaplar: Cevap[];
  kategoriler: Kategori[];
  sorular: Soru[];
  katId: number;
  soruId: number;
  cevapId:number;
  anketId: number;
  uyeid: number;
  secKat: Kategori;
  secAnket: Anket;
  secSoru: Soru;
  secCevap: Cevap;
  dataSource: any;
  islem: string;
  yeniKayit: Cevap;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourdFormGroup: FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRefa: MatDialogRef<AnketDialogComponent>;
  dialogRefk: MatDialogRef<KategoriDialogComponent>;
  dialogRefc: MatDialogRef<CevapDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  favoriteSeason: string;
  cevapSeasons: string[] = ['Evet', 'Hayır', 'Kısmen', 'Kesinlikle Hayır'];
  constructor(
    private _formBuilder: FormBuilder,
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public route: ActivatedRoute,
    public frmBuild: FormBuilder,

  ) { }

  ngOnInit() {
 
    this.AnketbyListe();
    this.sorubyListe();
    this.KategoriListe();
    this.CevapbyListele();
    this.uyeid = parseInt(localStorage.getItem('UyeId'));
    this.route.params.subscribe(p => {
      if (p.KategoriId) {
        this.katId = p.KategoriId;
        this.AnketListe();
      }
    });
    this.route.params.subscribe(p => {
      if (p.AnketId) {
        this.anketId = p.AnketId;
        this.SoruListe();
      }
    });
    this.route.params.subscribe(p => {
      if (p.SoruId) {
        this.soruId = p.SoruId;
        this.CevapListele();
      }
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    this.fourdFormGroup = this._formBuilder.group({
      fourdCtrl: ['', Validators.required],
    });



  }
  /*Kategoriler*/

  KategoriListe() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;

    });
  }
  KategoriSec(kat: Kategori) {
    this.katId = kat.KategoriId;
    this.AnketListe();
  }
  /*Kategoriler*/

  /*Anketler*/
  AnketListe() {
    this.apiServis.AnketListeleByKategoriId(this.katId).subscribe((d: Anket[]) => {
      this.anketler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  AnketbyListe() {
    this.apiServis.AnketListe().subscribe((d: Anket[]) => {
      this.anketler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  AnketSec(kat: Anket) {
    this.anketId = kat.AnketId;
    this.SoruListe();
  }

  /*Anketler*/

  /*Sorular*/
  SoruListe() {
    this.apiServis.SoruListeleByAnketId(this.anketId).subscribe((d: Soru[]) => {

      // this.secSoru.SoruAnketAdi=this.secAnket.AnketAdi;
      // this.secSoru.SoruCevapMetin=this.secCevap.CevapMetin;

      this.sorular = d;
      console.log(d);

    });
  }
  sorubyListe() {
    this.apiServis.SoruListele().subscribe((d: Soru[]) => {
      console.log(d);
      // this.secSoru.SoruAnketAdi=this.secAnket.AnketAdi;
      // this.secCevap.CevapMetin=this.secSoru.SoruCevapMetin;
      this.sorular = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  SoruSec(kat: Soru) {
    this.soruId = kat.SorularId;
    this.CevapListele();
  }
  /*Sorular*/
  CevapListele() {
    this.apiServis.CevapListeleBySoruId(this.soruId).subscribe((d: Cevap[]) => {
      this.cevaplar = d;
      console.log(d);
      // this.secCevap.CevapSoruId=this.secSoru.SorularId;
      // this.secCevap.CevapMetin=this.secSoru.SoruCevapMetin;
      // this.secCevap.CevapAnketAdi=this.secSoru.SoruAnketAdi;

      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  CevapbyListele() {
    this.apiServis.CevapListele().subscribe((d: Cevap[]) => {
      
      this.cevaplar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  CevapEkle() {
    var yeniKayit: Cevap = new Cevap();
    this.dialogRefc = this.matDialog.open(CevapDialogComponent, {
      width: '800px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRefc.afterClosed().subscribe(d => {
      if (d) {
        yeniKayit = d;
        yeniKayit.CevapTarih = new Date();
        yeniKayit.CevapUyeId = this.uyeid;
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
    this.dialogRefc = this.matDialog.open(CevapDialogComponent, {
      width: '800px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRefc.afterClosed().subscribe(d => {
      if (d) {
        kayit.CevapMetin = d.CevapMetin;
        kayit.CevapTarih = new Date();

        this.apiServis.CevapDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.CevapListele();
            window.location.reload();
          }
        });
      }
    });
  }
  GosterGizle() {
    this.gostergizle = ! this.gostergizle;
  }
}