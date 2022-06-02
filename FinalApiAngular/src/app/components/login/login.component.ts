import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
  }
  OturumAc(UyeEposta:string, UyeParola:string){
    this.apiServis.tokenAl(UyeEposta, UyeParola).subscribe((d:any) =>{
    
      localStorage.setItem("token",d.access_token);
      localStorage.setItem("UyeId",d.UyeId );
      localStorage.setItem("UyeEposta",d.UyeEposta);
      localStorage.setItem("UyeAdSoyad",d.UyeAdSoyad);
      localStorage.setItem("UyeYetki", d.UyeYetki);
      location.href = "/";
    
    
    console.log(d);
    },err =>{
      var s: Sonuc = new Sonuc();
      s.islem=false;
      s.mesaj="E-posta & parola hatalı"
      this.alert.AlertUygula(s);
    }
    );
    }
}
