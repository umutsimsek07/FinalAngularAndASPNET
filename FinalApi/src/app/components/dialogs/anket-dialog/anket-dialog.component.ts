import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Anket } from 'src/app/models/anket';
import { Kategori } from 'src/app/models/kategori';
import { Soru } from 'src/app/models/soru';
import { Uye } from 'src/app/models/uye';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-anket-dialog',
  templateUrl: './anket-dialog.component.html',
  styleUrls: ['./anket-dialog.component.scss']
})
export class AnketDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:Anket;
  yeniUye:Uye;
  yeniKategori:Kategori;
  kategoriler:Kategori[];
  yeniSoru:Soru;
  Jconfig={};
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef:MatDialogRef<AnketDialogComponent>,
    public frmBuild: FormBuilder,
    public apiServis:ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.islem = data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik = "Anket Ekle"
      this.yeniKayit= new Anket();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Anket Düzenle"
      this.yeniKayit= data.kayit;

    }
    this.frm=this.FormOlustur();
   }

  ngOnInit() {
    this.KategoriListe();
  }
  FormOlustur(){
    return this.frmBuild.group({
      AnketAdi:[this.yeniKayit.AnketAdi],
      AnketKategoriAdi:[this.yeniKayit.AnketKategoriAdi],
      AnketKategoriId:[this.yeniKayit.AnketKategoriId],
    });
  }
  KategoriListe() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    });
  }

}
