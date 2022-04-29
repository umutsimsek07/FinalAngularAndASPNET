using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uygulama1.ViewModel
{
    public class UyelerModel
    {
        public int UyeId { get; set; }
        public string UyeAdSoyad { get; set; }
        public string UyeEposta { get; set; }
        public System.DateTime UyeKayTarih { get; set; }
        public int UyeYetki { get; set; }
        public string UyeParola { get; set; }
    }
}