using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uygulama1.ViewModel
{
    public class AnketModel
    {
        public int AnketId { get; set; }
        public string AnketAdi { get; set; }
        public int AnketUyeId { get; set; }
        public System.DateTime AnketKayTarih { get; set; }
        public System.DateTime AnketDuzTarih { get; set; }
        public int AnketKategoriId { get; set; }
        public string AnketKategoriAdi { get; set; }
        public int AnketSoruSayi { get; set; }
    }
}