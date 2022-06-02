import { Soru } from './../../../models/soru';
import { Cevap } from './../../../models/cevap';
import { Component, Inject, OnInit } from '@angular/core';
import { Uye } from 'src/app/models/uye';
import { Anket } from 'src/app/models/anket';
import { Kategori } from 'src/app/models/kategori';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cevap-dialog',
  templateUrl: './cevap-dialog.component.html',
  styleUrls: ['./cevap-dialog.component.scss']
})
export class CevapDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:Cevap;
  yeniUye:Uye;
  yeniSoru:Soru;
  sorular:Soru[];
  yeniAnket:Anket;
  kategoriler:Kategori[];
  anketler:Anket[];
  Jconfig={};
  islem: string;
  frm: FormGroup;
  favoriteSeason: string;
  cevapSeasons: string[] =['Evet', 'Hayır', 'Kısmen', 'Kesinlikle Hayır']; 
  constructor(
    public dialogRef:MatDialogRef<CevapDialogComponent>,
    public frmBuild: FormBuilder,
    public apiServis:ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.islem = data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik = "Cevap Ekle"
      this.yeniKayit= new Cevap();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Cevabınız"
      this.yeniKayit= data.kayit;

    }
    this.frm=this.FormOlustur();
   }

  ngOnInit() {
    this.SoruListele();
  }
  FormOlustur(){
    return this.frmBuild.group({
      CevapMetin:[this.yeniKayit.CevapMetin],
      CevapSoruId:[this.yeniKayit.CevapSoruId],
    });
  }
  SoruListele() {
    this.apiServis.SoruListele().subscribe((d: Soru[]) => {
      this.sorular = d;
    });
  }

}
