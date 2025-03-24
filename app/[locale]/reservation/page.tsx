"use client";
import Layout from "@/components/layout/Layout";
import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLocale } from "next-intl";
import useAuth from "@/hooks/useAuth";

export default function Reservation() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("book");
  const t2 = useTranslations("pay");
  // State tanımlamaları
  const [vkn, setVkn] = useState("");
  const [name, setName] = useState<string | undefined>(undefined);
  const [surname, setSurname] = useState<string | undefined>(undefined);
  const [showBillingInfo, setShowBillingInfo] = useState(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [tc, setTc] = useState<string | undefined>(undefined);
  const [note, setNote] = useState<string>("");
  const [privacy, setPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Rezervasyon bilgileri
  const [bookingData, setBookingData] = useState<any>(null);
  const { user, token } = useAuth();

  // Fatura bilgileri
  const [companyName, setCompanyName] = useState<string>("");
  const [taxOffice, setTaxOffice] = useState<string>("");
  const [billingAddress, setBillingAddress] = useState<string>("");

  useEffect(() => {
    // Session storage'dan rezervasyon verilerini al
    try {
      const storedData = sessionStorage.getItem('bookingData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setBookingData(parsedData);
      } else {
        // Eğer veri yoksa, tur sayfasına geri yönlendir
        router.push(`/${locale}`);
      }
    } catch (error) {
      console.error("Error loading booking data:", error);
      setError(t("Error loading booking information"));
    }
  }, []);

  const handleVknChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setVkn(value);
  };

  const handleCheckboxChange = () => {
    setShowBillingInfo(!showBillingInfo);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      // Token kontrolü
      if (!token) {
        setError(t("Oturum süreniz dolmuş olabilir. Lütfen tekrar giriş yapın."));
        setIsSubmitting(false);
        return;
      }
      
      // Gerekli alanların kontrolü
      if (!name || !surname || !email || !phone) {
        setError(t("ad, soyad, email ve telefon alanları zorunludur"));
        setIsSubmitting(false);
        return;
      }

      // Email format kontrolü
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError(t("Geçerli bir email adresi giriniz"));
        setIsSubmitting(false);
        return;
      }

      // Privacy onayı kontrolü
      if (!privacy) {
        setError(t("Lütfen gizlilik politikasını kabul ediniz"));
        setIsSubmitting(false);
        return;
      }

      // Fatura bilgilerini hazırla
      const billingInfo = vkn ? {
        vkn: vkn,
        companyName: name,
        address: "",
        taxOffice: "",
        taxNumber: vkn
      } : null;

      // API için uygun veri formatı
      const completeBookingData = {
        // Temel tur bilgileri
        userId: user?.id,
        tourId: bookingData.tourId,
        tourName: bookingData.tourName,
        tourDate: bookingData.date,
        time: bookingData.time,
        totalPrice: bookingData.totalPrice,

        //Burası Booking Post İşlemi İçin Geçiçi !!!!
        adultCount: bookingData.adults.count,
        childCount: bookingData.children.length,
        contactName: name,
        contactEmail: email,
        contactPhone: phone,
        specialRequests: "bookingData.not",
        discountCode: "1234",

        // Katılımcı bilgileri
        adults: bookingData.adults,
        children: bookingData.children && bookingData.children.length > 0 ? bookingData.children : [],
        bookingExtras: bookingData.extras && bookingData.extras.length > 0 ? bookingData.extras : [],
        transferId: bookingData.transfer ? bookingData.transfer.id : null,

        // Müşteri bilgileri
        customerInfo: {
          name: name,
          surname: surname,
          email: email,
          phone: phone,
          identityNumber: tc || "",
          note: note || ""
        },

        // Fatura bilgileri (opsiyonel)
        billingInfo: billingInfo,

        // İşlem durumu ve para birimi
        status: "Pending",
        currency: bookingData.currency || "USD"
      };

      console.log("Sending booking data:", completeBookingData);

      // API'ye post işlemi
      const response = await axios.post(
        'https://api.hitravel.com.tr/api/Bookings',
        completeBookingData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 10000 // 10 saniye zaman aşımı
        }
      );

      console.log("API response:", response.data);

      // Başarılı yanıt
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);

        // Rezervasyon verilerini session storage'dan kaldır
        sessionStorage.removeItem('bookingData');

        // Ödeme sayfasına yönlendir
        router.push(`/${locale}/payment?bookingId=${response.data.id || ''}`);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);

      if (axios.isAxiosError(error) && error.response) {
        console.log("API error details:", error.response.data);
        
        // Token ile ilgili hataları kontrol et (401, 403)
        if (error.response.status === 401) {
          setError(t("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın."));
        } else if (error.response.status === 403) {
          setError(t("Bu işlem için yetkiniz bulunmuyor."));
        } else {
          setError(`${t("API Error")}: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        }
      } else {
        setError(t("An error occurred during booking"));
      }

      // Hata durumunda da test amaçlı payment sayfasına yönlendir (geçici çözüm)
      setTimeout(() => {
        router.push(`/${locale}/payment`);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <section className="box-section box-breadcrumb background-body py-4">
          <div className="container">
            <ul className="breadcrumbs">
              <li>
                <Link href="/">{t("ana")}</Link>
                <span className="arrow-right">
                  <svg
                    width={7}
                    height={12}
                    viewBox="0 0 7 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 11L6 6L1 1"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </li>
              <li>
                <Link href="/">{t("book")}</Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="section-box box-next-trips background-body">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-lg-8 mb-30">
                <h2 className="neutral-1000">{t("odemeYap")} </h2>
              </div>
            </div>
          </div>
        </section>

        {success ? (
          <div className="container my-5">
            <div className="alert alert-success p-4 text-center">
              <h3>{t("Booking successful!")}</h3>
              <p>{t("You are being redirected to the payment page")}</p>
            </div>
          </div>
        ) : (
        <section className="background-body py-8 mt-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="row">
              <div className="col-12 col-md-8">
                <div className="card p-4">
                    {/* Kişisel Bilgiler */}
                    <h4 className="mb-4">{t("Kişisel Bilgiler")}</h4>
                  <div className="mb-4 d-flex">
                    <div className="form-group w-50 me-2">
                      <label htmlFor="name" className="form-label">
                          {t("ad")} *
                      </label>
                      <input
                        type="text"
                        className="form-control bg-white border"
                        id="name"
                          value={name || ""}
                        onChange={(e) =>
                          setName(
                            e.target.value.replace(
                              /[^a-zA-ZıİçÇşŞğĞöÖüÜ ]/g,
                              ""
                            )
                          )
                        }
                        placeholder={t("ad")}
                          required
                      />
                    </div>

                      <div className="form-group w-50 ms-2">
                      <label htmlFor="surname" className="form-label">
                          {t("Soyad")} *
                      </label>
                      <input
                        type="text"
                        className="form-control bg-white border"
                        id="surname"
                          value={surname || ""}
                        onChange={(e) =>
                          setSurname(
                            e.target.value.replace(
                              /[^a-zA-ZıİçÇşŞğĞöÖüÜ ]/g,
                              ""
                            )
                          )
                        }
                        placeholder={t("Soyad")}
                          required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">
                          {t("phone")} *
                      </label>
                      <input
                        type="text"
                        className="form-control bg-white border"
                        id="phone"
                        value={phone || ""}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="0555 456 7890"
                        maxLength={15}
                          required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                          Mail *
                      </label>
                      <input
                        type="email"
                        className="form-control bg-white border"
                        id="email"
                          value={email || ""}
                          onChange={(e) => setEmail(e.target.value)}
                        placeholder="mail@mail.com"
                          required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="tc" className="form-label">
                      T.C Kimlik No/Pasaport No
                    </label>
                    <input
                      type="text"
                      className="form-control bg-white border"
                      id="tc"
                        value={tc || ""}
                      onChange={(e) =>
                        setTc(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      placeholder="11111111111"
                      maxLength={11}
                    />
                  </div>

                    {/* Fatura Bilgileri */}
                    <div className="mb-4 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="billingInfo"
                        checked={showBillingInfo}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billingInfo"
                      >
                        {t("Fatura Bilgilerini Ekle")}
                      </label>
                    </div>

                    {showBillingInfo && (
                      <div className="billing-info mb-4">
                        <h4 className="mb-3">{t("Fatura Bilgileri")}</h4>
                        <div className="mb-3">
                          <label htmlFor="companyName" className="form-label">
                            {t2("Şirket/Kurum Adı")}
                          </label>
                          <input
                            type="text"
                            className="form-control bg-white border"
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder={t2("Şirket/Kurum Adı")}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="vkn" className="form-label">
                            {t2("vkn")}
                          </label>
                          <input
                            type="text"
                            className="form-control bg-white border"
                            id="vkn"
                            value={vkn}
                            onChange={handleVknChange}
                            placeholder="VKN/TCKN"
                            maxLength={11}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="taxOffice" className="form-label">
                            {t2("vd")}
                          </label>
                          <input
                            type="text"
                            className="form-control bg-white border"
                            id="taxOffice"
                            value={taxOffice}
                            onChange={(e) => setTaxOffice(e.target.value)}
                            placeholder={t2("vd")}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="billingAddress" className="form-label">
                            {t2("add")}
                          </label>
                          <textarea
                            className="form-control bg-white border"
                            id="billingAddress"
                            value={billingAddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                            placeholder={t2("add")}
                            style={{ minHeight: "100px", resize: "vertical" }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Not Alanı */}
                    <div className="mb-4">
                    <label htmlFor="note" className="form-label">
                      {t("not")}
                    </label>
                    <textarea
                      className="form-control bg-white border"
                      id="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={t("not")}
                      style={{ minHeight: "100px", resize: "vertical" }}
                    />
                  </div>

                    {/* Gizlilik Politikası */}
                    <div className="mb-4 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="privacy"
                        checked={privacy}
                        onChange={() => setPrivacy(!privacy)}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="privacy"
                      >
                        {t2("okudum")} <Link href="/privacy">{t2("privacy")}</Link>
                      </label>
                    </div>

                    {/* Hata Mesajı */}
                    {error && (
                      <div className="alert alert-danger mb-4">
                        {error}
                      </div>
                    )}

                    {/* Rezervasyon Butonu */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="btn btn-dark w-100 py-2"
                    >
                      {isSubmitting ? t("İşlem Yapılıyor") : t("rez")}
                    </button>
                </div>
              </div>

              <div className="col-12 col-md-4 mt-4 mt-md-0">
                  <div className="card p-4">
                    <h5 className="mb-4">{t2("sepetOzeti")}</h5>
                    {bookingData && (
                      <>
                        <div className="mb-4 background-3 neutral-500" style={{ borderRadius: "3px", padding: "20px" }}>
                    <div className="text-black text-md font-extrabold">
                            📍{bookingData.tourName}
                    </div>
                    <div className="neutral-500">
                            📆 {bookingData.date} - {bookingData.time}
                    </div>
                          {bookingData.tourId && (
                    <div className="neutral-500">
                              🎫 {t("code")}: {bookingData.tourId.substring(0, 8)}
                    </div>
                          )}
                  </div>

                        <hr className="w-100 border-secondary" />
                        <p className="d-flex justify-content-between">
                          {bookingData.adults.count} {t("a")}
                          <span>${bookingData.adults.count * bookingData.adults.price}</span>
                        </p>

                        {bookingData.children && bookingData.children.length > 0 && (
                          <>
                            <hr className="w-100 border-secondary" />
                            <p className="d-flex justify-content-between">
                              {bookingData.children.length} {t("ç")}
                              <span>
                                ${bookingData.children.reduce((sum: number, child: any) => sum + child.price, 0)}
                              </span>
                            </p>
                          </>
                        )}

                        {bookingData.extras && bookingData.extras.length > 0 && (
                          <>
                  <hr className="w-100 border-secondary" />
                  <p className="d-flex justify-content-between">
                              {t("Ekstralar")}
                              <span>
                                ${bookingData.extras.reduce((sum: number, extra: any) => sum + (extra.price * extra.quantity), 0)}
                              </span>
                            </p>
                          </>
                        )}

                        {bookingData.transfer && (
                          <>
                  <hr className="w-100 border-secondary" />
                  <p className="d-flex justify-content-between">
                              {t("Transfer")} - {bookingData.transfer.cityName}
                              <span>${bookingData.transfer.price}</span>
                  </p>
                          </>
                        )}

                  <hr className="w-100 border-secondary" />
                  <p className="d-flex justify-content-between text-dark fw-bold">
                    {t("total")}
                          <span>${bookingData.totalPrice}</span>
                  </p>
                      </>
                    )}
                  </div>
                </div>
            </div>
          </div>
        </section>
        )}
      </Layout>
    </>
  );
}
