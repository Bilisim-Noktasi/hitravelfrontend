import * as Yup from "yup";

const createTourSchema = Yup.object({
  name: Yup.string().required("Ad gereklidir"),
  duration: Yup.string().required("Süre gereklidir"),
  groupSize: Yup.number().min(1, "Grup boyutu en az 1 olmalıdır").required("Grup boyutu gereklidir"),
  tourCategory: Yup.string().required("Tur kategorisi gereklidir"),
  overView: Yup.string().required("Genel bakış gereklidir"),
  highlight: Yup.string().required("Öne çıkanlar gereklidir"),
  durationDesc: Yup.string().required("Süre açıklaması gereklidir"),
  rating: Yup.number().min(0, "Rating en az 0 olmalıdır").max(5, "Rating en fazla 5 olmalıdır").required("Değerlendirme gereklidir"),
  questionAnswer: Yup.array().of(
    Yup.object({
      question: Yup.string().required("Soru gereklidir"),
      answer: Yup.string().required("Cevap gereklidir")
    })
  ).min(1, "En az bir soru-cevap gereklidir"),
  tourDateTime: Yup.array().of(
    Yup.object({
      days: Yup.array().of(Yup.string()).min(1, "Günler gereklidir"),
      times: Yup.array().of(Yup.string()).min(1, "Saatler gereklidir"),
      hours: Yup.string().required("Saat gereklidir")
    })
  ).min(1, "En az bir tur tarihi gereklidir"),
  tripType: Yup.object({
    departure: Yup.string().required("Kalkış yeri gereklidir"),
    turnaround: Yup.string().required("Dönüş yeri gereklidir")
  }).required(),
  included: Yup.array().of(Yup.string()).min(1, "En az bir içerik gereklidir"),
  excluded: Yup.array().of(Yup.string()).min(1, "En az bir dışlama gereklidir"),
  location: Yup.array().of(
    Yup.object({
      country: Yup.string().required("Ülke gereklidir"),
      city: Yup.string().required("Şehir gereklidir"),
      state: Yup.string().required("Eyalet gereklidir"),
      map: Yup.object({
        lat: Yup.string().required("Enlem gereklidir"),
        lon: Yup.string().required("Boylam gereklidir")
      }).required()
    })
  ).min(1, "En az bir lokasyon gereklidir"),
  extra: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Ekstra isim gereklidir"),
      price: Yup.number().required("Fiyat gereklidir")
    })
  ).min(1, "En az bir ekstra gereklidir"),
  prices: Yup.array().of(
    Yup.object({
      childPrice: Yup.object({
        minAge: Yup.number().required(),
        maxAge: Yup.number().required()
      }),
      price: Yup.number().required("Fiyat gereklidir")
    })
  ).min(1, "En az bir fiyat bilgisi gereklidir"),
  tourSubCategory: Yup.string().required("Tur alt kategorisi gereklidir"),
  languages: Yup.array().of(Yup.string()).min(1, "En az bir dil gereklidir"),
  note: Yup.string().optional()
});

export default createTourSchema;