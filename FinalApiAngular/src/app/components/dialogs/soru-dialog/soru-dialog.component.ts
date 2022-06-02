import { Anket } from './../../../models/anket';
import { Soru } from 'src/app/models/soru';
import { Component, Inject, OnInit } from '@angular/core';
import { Uye } from 'src/app/models/uye';
import { Kategori } from 'src/app/models/kategori';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-soru-dialog',
  templateUrl: './soru-dialog.component.html',
  styleUrls: ['./soru-dialog.component.scss']
})
export class SoruDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:Soru;
  yeniUye:Uye;
  yeniKategori:Kategori;
  yeniAnket:Anket;
  kategoriler:Kategori[];
  anketler:Anket[];
  yeniSoru:Soru;
  Jconfig={};
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef:MatDialogRef<SoruDialogComponent>,
    public frmBuild: FormBuilder,
    public apiServis:ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.islem = data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik = "Soru Ekle"
      this.yeniKayit= new Soru();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Soru Düzenle"
      this.yeniKayit= data.kayit;

    }
    this.frm=this.FormOlustur();
   }

  ngOnInit() {
    this.AnketListe();
  }
  FormOlustur(){
    return this.frmBuild.group({
      SoruMetin:[this.yeniKayit.SoruMetin],
      SoruAnketId:[this.yeniKayit.SoruAnketId],
    });
  }
  AnketListe() {
    this.apiServis.AnketListe().subscribe((d: Anket[]) => {
      this.anketler = d;
    });
  }

}
