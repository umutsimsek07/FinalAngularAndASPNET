using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using uygulama1.Models;
using uygulama1.ViewModel;

namespace uygulama1.Auth
{
    public class uyeService
    {
        DB01Entities1 db = new DB01Entities1();
        public UyelerModel UyeOturumAc(string UyeEposta, string UyeParola)
        {
            UyelerModel uye = db.Uyeler.Where(s => s.UyeEposta == UyeEposta && s.UyeParola == UyeParola).Select(x => new UyelerModel()
            {
                UyeId = x.UyeId,
                UyeAdSoyad = x.UyeAdSoyad,
                UyeEposta = x.UyeEposta,
                UyeKayTarih = x.UyeKayTarih,
                UyeParola = x.UyeParola,
                UyeYetki = x.UyeYetki
            }).SingleOrDefault();
            return uye;

        }
    }
}