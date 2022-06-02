using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uygulama1.ViewModel
{
    public class SorularModel
    {
        public int SorularId { get; set; }
        public int SoruAnketId { get; set; }
        public string SoruMetin { get; set; }
        public System.DateTime SoruKayTarih { get; set; }
        public int SoruUyeId { get; set; }
        public System.DateTime SoruDuzTarih { get; set; }
        public int SoruCevapSayi { get; set; }

        public string SoruAnketAdi { get; set; }

        public string SoruCevap { get; set; }
    }
}