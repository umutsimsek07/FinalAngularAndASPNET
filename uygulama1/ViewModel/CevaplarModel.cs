using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uygulama1.ViewModel
{
    public class CevaplarModel
    {
        public int CevapId { get; set; }
        public int CevapSoruId { get; set; }
        public string CevapMetin { get; set; }
        public System.DateTime CevapTarih { get; set; }
        public int CevapUyeId { get; set; }

    }
}