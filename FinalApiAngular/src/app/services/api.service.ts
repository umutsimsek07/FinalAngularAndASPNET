import { Cevap } from './../models/cevap';
import { Soru } from './../models/soru';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anket } from '../models/anket';
import { Kategori } from '../models/kategori';
import { Uye } from '../models/uye';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "https://localhost:44300/api/";
  uye:Uye[];
  constructor(
    public http: HttpClient
  ) { }

  /* Oturum işlemleri */

  tokenAl(UyeEposta: string, UyeParola: string) {
    var data = "username=" + UyeEposta + "&password=" + UyeParola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "token", data, { headers: reqHeader });

  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;

    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler){
    var sonuc : boolean = false;

    var uyeYetkiler:string[]=JSON.parse(localStorage.getItem("UyeYetki"));

    if (uyeYetkiler){
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element)> -1) {
          sonuc  = true;
          return false;
        }
      });
    }
    return sonuc;
  }
  /* Oturum işlemleri */


  /* API Kategori */
  KategoriListe(){
    return this.http.get(this.apiUrl + "/kategorilistele");
  }
  KategoriById(KategoriId:number){
    return this.http.get(this.apiUrl + "/kategoribyid/" + KategoriId)
  }
  KategoriEkle(kat: Kategori){
    return this.http.post(this.apiUrl + "/kategoriekle", kat);
  }
  KategoriDuzenle(kat: Kategori){
    return this.http.put(this.apiUrl + "/kategoriduzenle", kat);
  }
  KategoriSil(KategoriId:number){
    return this.http.delete(this.apiUrl + "/kategorisil/"+ KategoriId);
  }

    /* API Kategori */

    /* API Anket */

    AnketListe(){
      return this.http.get(this.apiUrl + "/anketlistele");
    }
    AnketListeleByKategoriId(KategoriId:number){
      return this.http.get(this.apiUrl + "/anketlistebykatid/" + KategoriId);
    }
    AnketById(AnketId:number){
      return this.http.get(this.apiUrl + "/anketbyid/" + AnketId)
    }
    AnketEkle(anket: Anket){
      return this.http.post(this.apiUrl + "/anketekle", anket);
    }
    AnketDuzenle(anket: Anket){
      return this.http.put(this.apiUrl + "/anketduzenle", anket);
    }
    AnketSil(AnketId:number){
      return this.http.delete(this.apiUrl + "/anketsil/"+ AnketId);
    }

    /* API Anket */




    /* API Soru*/
    SoruListele(){
      return this.http.get(this.apiUrl + "/sorulistele");
    }
    SoruListeleByAnketId(AnketId:number){
      return this.http.get(this.apiUrl + "/sorulistebyanketid/" + AnketId);
    }
    SoruById(SorularId:number){
      return this.http.get(this.apiUrl + "/sorubyid/" + SorularId)
    }
    SoruEkle(soru: Soru){
      return this.http.post(this.apiUrl + "/soruekle", soru);
    }
    SoruDuzenle(soru: Soru){
      return this.http.put(this.apiUrl + "/soruduzenle", soru);
    }
    SoruSil(SorularId:number){
      return this.http.delete(this.apiUrl + "/sorusil/"+ SorularId);
    }
    /* API Soru*/


     /* API Cevap*/
     CevapListele(){
      return this.http.get(this.apiUrl + "/cevaplistele");
    }
    CevapListeleBySoruId(SorularId:number){
      return this.http.get(this.apiUrl + "/cevaplistebysoruid/" + SorularId);
    }
    CevapById(CevapId:number){
      return this.http.get(this.apiUrl + "/cevapbyid/" + CevapId)
    }
    CevapEkle(cevap: Cevap){
      return this.http.post(this.apiUrl + "/cevapekle", cevap);
    }
    CevapDuzenle(cevap: Cevap){
      return this.http.put(this.apiUrl + "/cevapduzenle", cevap);
    }
    CevapSil(CevapId:number){
      return this.http.delete(this.apiUrl + "/cevapsil/"+ CevapId);
    }
    /* API Cevap*/



     /* API Uye*/
     UyeListele(){
      return this.http.get(this.apiUrl + "/uyelistele");
    }
    UyeById(UyeId:number){
      return this.http.get(this.apiUrl + "/uyebyid/" + UyeId)
    }
    UyeEkle(uye: Uye){
      return this.http.post(this.apiUrl + "/uyeekle", uye);
    }
    UyeDuzenle(uye: Uye){
      return this.http.put(this.apiUrl + "/uyeduzenle", uye);
    }
    UyeSil(UyeId:number){
      return this.http.delete(this.apiUrl + "/uyesil/"+ UyeId);
    }
    /* API Uye*/
}
