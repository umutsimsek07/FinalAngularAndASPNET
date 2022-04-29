using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using uygulama1.Models;
using uygulama1.ViewModel;

namespace uygulama1.Controllers
{
    public class ServisController : ApiController
    {
        DB01Entities1 db = new DB01Entities1();
        SonucModel sonuc = new SonucModel();

        #region Kategori
        [HttpGet]
        [Route("api/kategorilistele")]
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategoriler.Select(x => new KategoriModel()
            {
                KategoriId = x.KategoriId,
                KategoriAdi = x.KategoriAdi,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/kategoribyid/{KategoriId}")]
        public KategoriModel KategoriById(int KategoriId)
        {
            KategoriModel kayit = db.Kategoriler.Where(s => s.KategoriId == KategoriId).Select(x => new KategoriModel()
            {
                KategoriId = x.KategoriId,
                KategoriAdi = x.KategoriAdi,
                KategoriAnketSayi = x.Anketler.Count()

            }).FirstOrDefault();

            return kayit;
        }
        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategoriler.Count(s => s.KategoriAdi == model.KategoriAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Adı Kayıtlıdır!";
                return sonuc;
            }
            Kategoriler yeni = new Kategoriler();
            yeni.KategoriAdi = model.KategoriAdi;
            db.Kategoriler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Eklendi";
            return sonuc;
        }
        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategoriler kayit = db.Kategoriler.Where(s => s.KategoriId == model.KategoriId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Bulunamadı!";
                return sonuc;
            }
            kayit.KategoriAdi = model.KategoriAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Düzenlendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/kategorisil/{KategoriId}")]

        public SonucModel KategoriSil(int KategoriId)
        {
            Kategoriler Kayit = db.Kategoriler.Where(s => s.KategoriId == KategoriId).FirstOrDefault();
            if (Kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Bulunamadı!";
                return sonuc;
            }

            if (db.Anketler.Count(s => s.AnketKategoriId == KategoriId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Anket Bulunan Kategori Silinemez";
                return sonuc;
            }
            db.Kategoriler.Remove(Kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }

        #endregion
        #region Anketler
        [HttpGet]
        [Route("api/anketlistele")]

        public List<AnketModel> AnketListe()
        {
            List<AnketModel> liste = db.Anketler.Select(x => new AnketModel()
            {
                AnketId = x.AnketId,
                AnketAdi = x.AnketAdi,
                AnketKategoriAdi = x.Kategoriler.KategoriAdi,
                AnketKayTarih = x.AnketKayTarih,
                AnketDuzTarih = x.AnketDuzTarih,
                AnketKategoriId = x.Kategoriler.KategoriId,
                AnketUyeId = x.Uyeler.UyeId
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/anketlistebykatid/{KategoriId}")]
        public List<AnketModel> AnketListeByKatId(int KategoriId)
        {
            List<AnketModel> liste = db.Anketler.Where(s => s.AnketKategoriId == KategoriId).Select(x =>
           new AnketModel()
           {
               AnketId = x.AnketId,
               AnketAdi = x.AnketAdi,
               AnketKategoriAdi = x.Kategoriler.KategoriAdi,
               AnketKayTarih = x.AnketKayTarih,
               AnketDuzTarih = x.AnketDuzTarih,
               AnketKategoriId = x.Kategoriler.KategoriId,
               AnketUyeId = x.Uyeler.UyeId,
               AnketSoruSayi = x.Sorular.Count()
           }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/anketbyid/{AnketId}")]
        public List<AnketModel> AnketListeById(int AnketId)
        {
            List<AnketModel> liste = db.Anketler.Where(s => s.AnketId == AnketId).Select(x =>
           new AnketModel()
           {
               AnketId = x.AnketId,
               AnketAdi = x.AnketAdi,
               AnketKategoriAdi = x.Kategoriler.KategoriAdi,
               AnketKayTarih = x.AnketKayTarih,
               AnketDuzTarih = x.AnketDuzTarih,
               AnketKategoriId = x.Kategoriler.KategoriId,
               AnketUyeId = x.Uyeler.UyeId,
               AnketSoruSayi = x.Sorular.Count()
           }).ToList();
            return liste;
        }
        [HttpPost]
        [Route("api/anketekle")]
        public SonucModel AnketEkle(AnketModel model)
        {
            if (db.Anketler.Count(s => s.AnketAdi == model.AnketAdi && s.AnketKategoriId == model.AnketKategoriId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Anket İlgili Kategoride Kayıtlıdır!";
                return sonuc;
            }
            Anketler yeni = new Anketler();
            yeni.AnketAdi = model.AnketAdi;
            yeni.AnketKategoriId = model.AnketKategoriId;
            yeni.AnketUyeId = model.AnketUyeId;
            yeni.AnketKayTarih = model.AnketKayTarih;
            yeni.AnketDuzTarih = model.AnketDuzTarih;
            db.Anketler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Anket Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/anketduzenle")]
        public SonucModel AnketDuzenle(AnketModel model)
        {
            Anketler kayit = db.Anketler.Where(s => s.AnketId == model.AnketId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Anket Bulunamadı!";
                return sonuc;
            }
            kayit.AnketAdi = model.AnketAdi;
            kayit.AnketKategoriId = model.AnketKategoriId;
            kayit.AnketDuzTarih = model.AnketDuzTarih;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Anket Düzenlendi";
            return sonuc;

            
        }
        [HttpDelete]
        [Route("api/anketsil/{AnketId}")]
        public SonucModel AnketSil(int AnketId)
        {
            Anketler kayit = db.Anketler.Where(s => s.AnketId == AnketId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Anket Bulunamadı!";
                return sonuc;
            }
            if (db.Sorular.Count(s=> s.SoruAnketId == AnketId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Soru Kaydı Olan Kategori Silinemez!";
                return sonuc;
            }

            db.Anketler.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Anket Silindi";
            return sonuc;
        }
        #endregion
        #region Sorular
        [HttpGet]
        [Route("api/sorulistele")]

        public List<SorularModel> SoruListe()
        {
            List<SorularModel> liste = db.Sorular.Select(x => new SorularModel()
            {
                SorularId = x.SorularId,
                SoruMetin = x.SoruMetin,
                SoruAnketId = x.SoruAnketId,
                SoruDuzTarih = x.SoruDuzTarih,
                SoruKayTarih = x.SoruKayTarih,
                SoruUyeId = x.SoruUyeId,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/sorulistebyanketid/{AnketId}")]
        public List<SorularModel> SoruListeByAnketId(int AnketId)
        {
            List<SorularModel> liste = db.Sorular.Where(s => s.SoruAnketId==AnketId).Select(x =>
           new SorularModel()
           {
               SorularId=x.SorularId,
               SoruMetin=x.SoruMetin,
               SoruAnketId=x.SoruAnketId,
               SoruDuzTarih=x.SoruDuzTarih,
               SoruKayTarih=x.SoruKayTarih,
               SoruUyeId=x.SoruUyeId,
           }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/sorubyid/{SorularId}")]
        public List<SorularModel> SoruListeById(int SorularId)
        {
            List<SorularModel> liste = db.Sorular.Where(s => s.SorularId == SorularId).Select(x =>
           new SorularModel()
           {
               SorularId = x.SorularId,
               SoruMetin = x.SoruMetin,
               SoruAnketId = x.SoruAnketId,
               SoruDuzTarih = x.SoruDuzTarih,
               SoruKayTarih = x.SoruKayTarih,
               SoruUyeId = x.SoruUyeId,
               SoruCevapSayi=x.Cevaplar.Count()
           }).ToList();
            return liste;
        }
        [HttpPost]
        [Route("api/soruekle")]
        public SonucModel SoruEkle(SorularModel model)
        {
            if (db.Sorular.Count(s => s.SoruMetin == model.SoruMetin && s.SoruAnketId == model.SoruAnketId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Soru İlgili Ankette Kayıtlıdır!";
                return sonuc;
            }
            Sorular yeni = new Sorular();
            yeni.SoruMetin = model.SoruMetin;
            yeni.SoruAnketId = model.SoruAnketId;
            yeni.SoruKayTarih = model.SoruKayTarih;
            yeni.SoruDuzTarih = model.SoruDuzTarih;
            yeni.SoruUyeId = model.SoruUyeId;
            db.Sorular.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Soru Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/soruduzenle")]
        public SonucModel SoruDuzenle(SorularModel model)
        {
            Sorular kayit = db.Sorular.Where(s => s.SorularId == model.SorularId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Soru Bulunamadı!";
                return sonuc;
            }
            kayit.SoruMetin = model.SoruMetin;
            kayit.SoruDuzTarih = model.SoruDuzTarih;
            kayit.SoruAnketId = model.SoruAnketId;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Cevap Düzenlendi";
            return sonuc;


        }
        [HttpDelete]
        [Route("api/sorusil/{SorularId}")]
        public SonucModel SoruSil(int SorularId)
        {
            Sorular kayit = db.Sorular.Where(s => s.SorularId == SorularId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Soru Bulunamadı!";
                return sonuc;
            }
            if (db.Cevaplar.Count(s => s.CevapSoruId == SorularId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Cevap Kaydı Olan Soru Silinemez!";
                return sonuc;
            }

            db.Sorular.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Silindi";
            return sonuc;
        }
        #endregion
        #region Cevaplar
        [HttpGet]
        [Route("api/cevaplistele")]

        public List<CevaplarModel> CevapListe()
        {
            List<CevaplarModel> liste = db.Cevaplar.Select(x => new CevaplarModel()
            {
               CevapId=x.CevapId,
               CevapMetin=x.CevapMetin,
               CevapSoruId=x.CevapSoruId,
               CevapTarih=x.CevapTarih,
               CevapUyeId=x.CevapUyeId

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/Cevaplistebysoruid/{SorularId}")]
        public List<CevaplarModel> CevapListeBySoruId(int SorularId)
        {
            List<CevaplarModel> liste = db.Cevaplar.Where(s => s.CevapSoruId == SorularId).Select(x =>
             new CevaplarModel()
             {
                 CevapId = x.CevapId,
                 CevapMetin = x.CevapMetin,
                 CevapSoruId = x.CevapSoruId,
                 CevapTarih = x.CevapTarih,
                 CevapUyeId = x.CevapUyeId
             }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/cevapbyid/{CevapId}")]
        public List<CevaplarModel> CevapListeById(int CevapId)
        {
            List<CevaplarModel> liste = db.Cevaplar.Where(s => s.CevapId == CevapId).Select(x =>
           new CevaplarModel()
           {
               CevapId = x.CevapId,
               CevapMetin = x.CevapMetin,
               CevapSoruId = x.CevapSoruId,
               CevapTarih = x.CevapTarih,
               CevapUyeId = x.CevapUyeId
              
           }).ToList();
            return liste;
        }
        [HttpPost]
        [Route("api/cevapekle")]
        public SonucModel CevapEkle(CevaplarModel model)
        {
            if (db.Cevaplar.Count(s => s.CevapMetin == model.CevapMetin && s.CevapSoruId == model.CevapSoruId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Cevap İlgili Soruya Kayıtlıdır!";
                return sonuc;
            }
            Cevaplar yeni = new Cevaplar();
            yeni.CevapMetin = model.CevapMetin;
            yeni.CevapSoruId = model.CevapSoruId;
            yeni.CevapTarih = model.CevapTarih;
            yeni.CevapUyeId = model.CevapUyeId;
            db.Cevaplar.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Cevap Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/cevapduzenle")]
        public SonucModel CevapDuzenle(CevaplarModel model)
        {
            Cevaplar kayit = db.Cevaplar.Where(s => s.CevapId == model.CevapId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Cevap Bulunamadı!";
                return sonuc;
            }
            kayit.CevapMetin = model.CevapMetin;
            kayit.CevapTarih = model.CevapTarih;
            kayit.CevapSoruId = model.CevapSoruId;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Cevap Düzenlendi";
            return sonuc;


        }
        [HttpDelete]
        [Route("api/cevapsil/{CevapId}")]
        public SonucModel CevapSil(int CevapId)
        {
            Cevaplar kayit = db.Cevaplar.Where(s => s.CevapId == CevapId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Cevap Bulunamadı!";
                return sonuc;
            }
        
            db.Cevaplar.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Cevap Silindi";
            return sonuc;
        }
        #endregion
        #region Uyeler
        [HttpGet]
        [Route("api/uyelistele")]

        public List<UyelerModel> UyeListe()
        {
            List<UyelerModel> liste = db.Uyeler.Select(x => new UyelerModel()
            {
                UyeId=x.UyeId,
                UyeAdSoyad=x.UyeAdSoyad,
                UyeEposta=x.UyeEposta,
                UyeKayTarih=x.UyeKayTarih,
                UyeYetki=x.UyeYetki,
                UyeParola=x.UyeParola

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/uyebyid/{UyeId}")]
        public List<UyelerModel> UyeListeById(int UyeId)
        {
            List<UyelerModel> liste = db.Uyeler.Where(s => s.UyeId == UyeId).Select(x =>
           new UyelerModel()
           {
               UyeId = x.UyeId,
               UyeAdSoyad = x.UyeAdSoyad,
               UyeEposta = x.UyeEposta,
               UyeKayTarih = x.UyeKayTarih,
               UyeYetki = x.UyeYetki,
               UyeParola = x.UyeParola


           }).ToList();
            return liste;
        }
        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyelerModel model)
        {
            if (db.Uyeler.Count(s => s.UyeEposta == model.UyeEposta ) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Uye  Kayıtlıdır!";
                return sonuc;
            }
            Uyeler yeni = new Uyeler();
            yeni.UyeAdSoyad = model.UyeAdSoyad;
            yeni.UyeEposta = model.UyeEposta;
            yeni.UyeKayTarih = model.UyeKayTarih;
            yeni.UyeYetki = model.UyeYetki;
            yeni.UyeParola = model.UyeParola;
            db.Uyeler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Uye Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyelerModel model)
        {
            Uyeler kayit = db.Uyeler.Where(s => s.UyeId == model.UyeId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Uye Bulunamadı!";
                return sonuc;
            }
            //kayit.UyeId = model.UyeId;
            kayit.UyeAdSoyad = model.UyeAdSoyad;
            kayit.UyeEposta = model.UyeEposta;
            kayit.UyeKayTarih = model.UyeKayTarih;
            kayit.UyeYetki = model.UyeYetki;
            kayit.UyeParola = model.UyeParola;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Uye Düzenlendi";
            return sonuc;


        }
        [HttpDelete]
        [Route("api/uyesil/{UyeId}")]
        public SonucModel UyeSil(int UyeId)
        {
            Uyeler kayit = db.Uyeler.Where(s => s.UyeId == UyeId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Uye Bulunamadı!";
                return sonuc;
            }

            db.Uyeler.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Uye Silindi";
            return sonuc;
        }
        #endregion
    }

}