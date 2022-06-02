import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/sonuc';
import { Uye } from 'src/app/models/uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.scss']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Uye;
  islem: string;
  frm: FormGroup;
  dataSource: any;
  uye: Uye[];
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public matDialog: MatDialog,
    public apiServis: ApiService,
    public alert: MyAlertService,


  ) {
    this.islem = data.islem;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Uye Ekle";
      this.yeniKayit = new Uye();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Uye Duzenle"
      this.yeniKayit = data.kayit;

    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmBuild.group({
      UyeAdSoyad: [this.yeniKayit.UyeAdSoyad],
      UyeEposta: [this.yeniKayit.UyeEposta],
      UyeParola: [this.yeniKayit.UyeParola],
      UyeKayTarih:[this.yeniKayit.UyeKayTarih],
      UyeYetki: [this.yeniKayit.UyeYetki],
    })
  };
  Ekle() {
    var yeniKayit: Uye = new Uye();
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {


        yeniKayit.UyeYetki = d.UyeYetki;

        this.apiServis.UyeEkle(d).subscribe((s: Sonuc) => {
          console.log(d)
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
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
